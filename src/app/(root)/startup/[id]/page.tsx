import Views from '@/components/startup/Views';
import { Skeleton } from '@/components/ui/skeleton';
import { dateformat } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
// import { sanityFetch } from '@/sanity/lib/live';
import { STARTUP_BY_ID_QUERY, STARTUPS_BY_CATEGORY_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import markdownit from 'markdown-it'
import Image from 'next/image';
import Link from 'next/link';
import { Pencil } from 'lucide-react';
import { auth } from '../../../../../auth';
import StartupCard from '@/components/startup/StartupCard';

const md = markdownit()

interface params {
    params: Promise<{
        id: string;
    }>
}

export const experimental_ppr = true;

const StartUpPage = async ({ params }: params) => {
    const id = (await params).id;

    const session = await auth();

    // Fetch the post first
    const postData: StartupCardProps = await client.fetch(STARTUP_BY_ID_QUERY, { id });

    // Now fetch categoryStartUps using post.category
    const categoryStartUpsData =  client.fetch(STARTUPS_BY_CATEGORY_QUERY, {
        category: postData.category,
        title: postData.title,
    });

    // Initiate both requests in parallel
    const [post, categoryStartUp] = await Promise.all([postData, categoryStartUpsData])

    if (!post) return notFound();

    const parsedContent = md.render(post.pitch || "")

    return (
        <main>
            <section className="orange_container">
                <h5 className="tag uppercase">
                    {dateformat(post._createdAt)}
                </h5>
                <h1 className="heading">
                    {post.title}
                </h1>
                <p className="sub-heading">
                    {post.description}
                </p>
            </section>
            <section className='section_container'>
                <Image
                    src={post?.image || ""}
                    alt={post?.title || ""}
                    width={1080}
                    height={1080}
                    className="w-full h-full rounded-2xl"
                />
                <div className='space-y-5 my-6 max-w-4xl mx-auto'>
                    <div className='flex-between'>
                        <Link href={`/user/${post.author?._id}`}
                            className='flex gap-2 items-center my-2'
                        >
                            <div className="flex h-11 w-11 shrink-0 overflow-hidden rounded-full">
                                <Image
                                    src={post.author?.image || "/default-avatar.png"}
                                    alt={post.author?.name || "User"}
                                    height={64}
                                    width={64}
                                    className="aspect-square h-full w-full"
                                />
                            </div>
                            <div>
                                <p className='text-20-medium'>{post.author?.name}</p>
                                <p className='text-16-medium !text-black-300'>
                                    @{post.author?.username}
                                </p>
                            </div>
                        </Link>
                        <div className='flex items-center gap-2'>
                            <p className='category-tag'>
                                {post.category}
                            </p>
                            {
                                session?.id == post.author?._id && (
                                    <Link href={`/startup/${post._id}/edit`} className='bg-white hover:bg-white-100 px-5 py-2 rounded-md'>
                                        <Pencil className='text-primary' size={25} />
                                    </Link>
                                )
                            }
                        </div>
                    </div>
                    <h3 className='text-30-bold'>StartUp Pitch</h3>
                    {
                        parsedContent ? (
                            <article
                                className='prose max-w-4xl font-work-sans break-all'
                                dangerouslySetInnerHTML={{ __html: parsedContent }}
                            />
                        )
                            : (
                                <p className='no-result'>NO Details Provided</p>
                            )
                    }
                </div>
                <hr className='divider' />
                {
                    categoryStartUp.length > 0 && (
                        <div className='max-w-4xl mx-auto'>
                            <p className='text-30-semibold'>Recommended StartUps</p>
                            <ul className='mt-5 card_grid-sm'>
                            {
                                categoryStartUp.map((post: StartupCardProps) => (
                                    <StartupCard key={post._id} post={post} />
                                ))
                            }
                            </ul>
                        </div>
                    )
                }
                <Suspense fallback={<Skeleton className="view_skeleton" />}>
                    <Views id={id} />
                </Suspense>
            </section>
        </main>
    )
}

export default StartUpPage
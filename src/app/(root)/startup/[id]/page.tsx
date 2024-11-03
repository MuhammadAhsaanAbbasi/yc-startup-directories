import Views from '@/components/startup/Views';
import { Skeleton } from '@/components/ui/skeleton';
import { dateformat } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
// import { sanityFetch } from '@/sanity/lib/live';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import markdownit from 'markdown-it'
import Image from 'next/image';
import Link from 'next/link';

const md = markdownit()

interface params {
    params: Promise<{
        id: string;
    }>
}

const StartUpPage = async ({ params }: params) => {
    const id = (await params).id;

    const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });

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
                    <div className='flex-between gap-5'>
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
                        <p className='category-tag'>{post.category}</p>
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
                <Suspense fallback={<Skeleton className="view_skeleton" />}>
                    <Views id={id} />
                </Suspense>
            </section>
        </main>
    )
}

export default StartUpPage
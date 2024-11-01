import { Eye } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { dateformat } from '@/lib/utils'
import { Author, Startup } from "@/sanity/types";

export type StartupCardProps = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ post }: { post: StartupCardProps }) => {
    return (
        <li className='startup-card group'>
            <div className='flex-between myb-1'>
                <p className='startup-card_date'>
                    {dateformat(post._createdAt)}
                </p>
                <div className='flex gap-1.5'>
                    <Eye className='size-6 text-primary' />
                    <span className='text-16-medium'>{post.views}</span>
                </div>
            </div>
            <div className='flex-between my-2'>
                <div className='flex-1'>
                    <Link href={`/user/${post.author?._id}`}>
                        <p className='text-16-medium'>
                            {post.author?.name}
                        </p>
                    </Link>
                    <Link href={`/startup/${post._id}`}>
                        <p className='text-26-semibold'>
                            {post.title}
                        </p>
                    </Link>
                </div>
                <div className="flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <Image
                        src={post.author?.image || "/default-avatar.png"}
                        alt={post.author?.name || "User"}
                        height={50}
                        width={50}
                        className="aspect-square h-full w-full"
                    />
                </div>
            </div>
            <Link href={`/startup/${post._id}`}>
                <p className='text-16-medium line-clamp-3'>{post.description}</p>
                <Image
                    src={post?.image || "" }
                    alt={post?.title || ""}
                    height={200}
                    width={200}
                    className='startup-card_img'
                />
            </Link>
            <div className='flex-between gap-3 my-3'>
                <Link href={`/?query=${post.category?.toLowerCase()}`}>
                    <p className='text-26-semibold'>{post.category}</p>
                </Link>
                <Link href={`/startup/${post._id}`}>
                    <Button className='startup-card_btn'>
                        Details
                    </Button>
                </Link>
            </div>
        </li>
    )
}

export default StartupCard
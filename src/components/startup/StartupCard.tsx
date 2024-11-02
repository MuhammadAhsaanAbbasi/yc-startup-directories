import { Eye } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { dateformat } from '@/lib/utils'

const StartupCard = ({ post }: { post: StartupCardProps }) => {
    const {title, description, views, author, category, _id, image, _createdAt} = post
    return (
        <li className='startup-card group'>
            <div className='flex-between myb-1'>
                <p className='startup-card_date'>
                    {dateformat(_createdAt)}
                </p>
                <div className='flex gap-1.5'>
                    <Eye className='size-6 text-primary' />
                    <span className='text-16-medium'>{views}</span>
                </div>
            </div>
            <div className='flex-between my-2'>
                <div className='flex-1'>
                    <Link href={`/user/${author?._id}`}>
                        <p className='text-16-medium'>
                            {author?.name}
                        </p>
                    </Link>
                    <Link href={`/startup/${_id}`}>
                        <p className='text-26-semibold'>
                            {title}
                        </p>
                    </Link>
                </div>
                <div className="flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <Image
                        src={author?.image || "/default-avatar.png"}
                        alt={author?.name || "User"}
                        height={50}
                        width={50}
                        className="aspect-square h-full w-full"
                    />
                </div>
            </div>
            <Link href={`/startup/${_id}`}>
                <p className='text-16-medium line-clamp-3'>{description}</p>
                <Image
                    src={image || "" }
                    alt={title || ""}
                    height={200}
                    width={200}
                    className='startup-card_img'
                />
            </Link>
            <div className='flex-between gap-3 my-3'>
                <Link href={`/?query=${category?.toLowerCase()}`}>
                    <p className='text-26-semibold'>{category}</p>
                </Link>
                <Link href={`/startup/${_id}`}>
                    <Button className='startup-card_btn'>
                        Details
                    </Button>
                </Link>
            </div>
        </li>
    )
}

export default StartupCard
import React from 'react'
import { StartupCardProps } from './StartupCard'
import { dateformat } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

const StartUpDetails = ({ startDetails }: { startDetails: StartupCardProps }) => {
    return (
        <>
            <section className="orange_container">
                <h5 className="tag uppercase">
                    {dateformat(startDetails._createdAt)}
                </h5>
                <h1 className="heading">
                    {startDetails.title}
                </h1>
                <p className="sub-heading">
                    {startDetails.description}
                </p>
            </section>
            <section className='section_container'>
                <Image
                    src={startDetails?.image || ""}
                    alt={startDetails?.title || ""}
                    width={1080}
                    height={1080}
                    className="w-full h-full rounded-2xl"
                />
                <div className='space-y-5 my-6 max-w-4xl mx-auto'>
                    <div className='flex-between gap-5'>
                        <Link href={`/user/${startDetails.author?._id}`}
                            className='flex gap-2 items-center my-2'
                        >
                            <div className="flex h-11 w-11 shrink-0 overflow-hidden rounded-full">
                                <Image
                                    src={startDetails.author?.image || "/default-avatar.png"}
                                    alt={startDetails.author?.name || "User"}
                                    height={64}
                                    width={64}
                                    className="aspect-square h-full w-full"
                                />
                            </div>
                            <div>
                                <p className='text-20-medium'>{startDetails.author?.name}</p>
                                <p className='text-16-medium !text-black-300'>
                                    @{startDetails.author?.username}
                                </p>
                            </div>
                        </Link>
                        <p className='category-tag'>{startDetails.category}</p>
                    </div>
                    <h3 className='text-30-bold'>StartUp Pitch</h3>
                    {/* {

                    } */}
                </div>
            </section>
        </>
    )
}

export default StartUpDetails
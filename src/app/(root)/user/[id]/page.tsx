import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import { auth } from '../../../../../auth';
import UserStartUps from '@/components/startup/UserStartUps';
import { StartupCardSkeleton } from '@/components/startup/StartupCard';

interface Params {
    params: Promise<{
        id: string;
    }>
}

export const experimental_ppr = true;

const UserProfilePage = async ({ params }: Params) => {
    const id = (await params).id

    const session = await auth();

    const user = await client.fetch(AUTHOR_BY_ID_QUERY, {
        id
    });

    if (!user) return notFound();

    return (
        <section className='profile_container'>
            <div className='profile_card'>
                <div className='profile_title'>
                    <h3 className='text-24-black uppercase text-center line-clamp-2'>
                        {user?.name}
                    </h3>
                </div>
                <Image
                    src={user?.image}
                    alt={user?.image}
                    height={220}
                    width={200}
                    className='profile_image'
                />
                <p className='text-30-extrabold my-5 text-center'>
                    @{user?.username}
                </p>
                <p className='my-1 text-center text-14-normal'>
                    {user?.bio}
                </p>
            </div>
            <div className='flex-1 flex flex-col gap-5 lg:-mt-5'>
                <p className='text-30-bold'>
                    {
                        session?.id == id ? "Your" : "All"
                    } StartUps
                </p>
                <Suspense fallback={<StartupCardSkeleton />}>
                    <UserStartUps userId={id} />
                </Suspense>
            </div>
        </section>
    )
}

export default UserProfilePage
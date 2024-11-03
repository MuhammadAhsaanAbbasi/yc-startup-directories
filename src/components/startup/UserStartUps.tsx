import { client } from '@/sanity/lib/client'
import { STARTUP_BY_AUTHOR_ID_QUERY } from '@/sanity/lib/queries'
import React from 'react'
import StartupCard from './StartupCard'

const UserStartUps = async ({ userId }: { userId: string }) => {
    const startUps: StartupCardProps[] = await client.fetch(STARTUP_BY_AUTHOR_ID_QUERY, { id: userId })
    return (
        <ul className='card_grid-sm'>
            {
                startUps.map((starUp) => (
                    <StartupCard key={starUp._id} post={starUp} />
                ))
            }
        </ul>
    )
}

export default UserStartUps
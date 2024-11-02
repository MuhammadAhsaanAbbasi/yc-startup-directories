import React from 'react'
import Ping from '@/components/shared/Ping'
import { client } from '@/sanity/lib/client'
import { STARTUP_Views_QUERY } from '@/sanity/lib/queries';
import { writeClient } from '@/sanity/lib/write-client';
import { unstable_after as after } from 'next/server';

const Views = async ({id}: {id: string}) => {
    const { views: totalViews } = await client.withConfig({useCdn: false})
    .fetch(STARTUP_Views_QUERY, {id});
    console.log(totalViews);

    after(
        async () => await writeClient
        .patch(id)
        .set({views: totalViews + 1})
        .commit()
        .catch((err) => console.error(err))
    )

    return (
        <div className='view-container'>
            <div className='absolute -top-2 -right-2'>
                <Ping />
            </div>
            <p className='view-text'>
                <span className='font-black'>Views: {totalViews}</span>
            </p>
        </div>
    )
}

export default Views
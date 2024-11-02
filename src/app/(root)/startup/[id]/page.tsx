import StartUpDetails from '@/components/startup/StartUpDetails';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import React from 'react'

interface params {
    params: {
        id: Promise<string>;
    }
}

const StartUpPage = async ({ params }: params) => {
    const Id = (await params).id;
    const startUpId = { id: Id || null };

    const { data: post } = await sanityFetch({ query: STARTUP_BY_ID_QUERY, params: startUpId });
    return (
        <>
            <StartUpDetails startDetails={post} />
            <SanityLive />
        </>
    )
}

export default StartUpPage
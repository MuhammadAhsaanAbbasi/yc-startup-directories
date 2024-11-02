import StartUpDetails from '@/components/startup/StartUpDetails';
import Views from '@/components/startup/Views';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'

interface params {
    params: Promise<{
        id: string;
    }>
}

const StartUpPage = async ({ params }: params) => {
    const Id = (await params).id;
    const startUpId = { id: Id || null };

    const { data: post } = await sanityFetch({ query: STARTUP_BY_ID_QUERY, params: startUpId });

    if (!post) return notFound();

    return (
        <main>
            <StartUpDetails startDetails={post} />
            <Suspense fallback={<div>Loading...</div>}>
                <Views id={Id} />
            </Suspense>
            <SanityLive />
        </main>
    )
}

export default StartUpPage
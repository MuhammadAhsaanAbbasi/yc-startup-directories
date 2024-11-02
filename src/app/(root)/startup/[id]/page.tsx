import StartUpDetails from '@/components/startup/StartUpDetails';
import Views from '@/components/startup/Views';
import { client } from '@/sanity/lib/client';
// import { sanityFetch } from '@/sanity/lib/live';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'

interface params {
    params: Promise<{
        id: string;
    }>
}

const StartUpPage = async ({ params }: params) => {
    const id = (await params).id;
    // const startUpId = { id: Id || null };

    const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });

    if (!post) return notFound();

    return (
        <main>
            <StartUpDetails startDetails={post} />
            <Suspense fallback={<div>Loading...</div>}>
                <Views id={id} />
            </Suspense>
        </main>
    )
}

export default StartUpPage
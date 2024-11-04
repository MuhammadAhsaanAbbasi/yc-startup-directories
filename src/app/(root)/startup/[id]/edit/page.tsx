import StartUpForm from '@/components/startup/StartUpForm'
import React from 'react'
import { auth } from '../../../../../../auth'
import { redirect } from 'next/navigation'

interface params {
    params: Promise<{
        id: string
    }>
}

const StartUpEditPage = async ({ params }: params) => {
    const id = (await params).id;

    const session = await auth();

    if (!session) redirect("/");

    return (
        <main>
            <section className='orange_container'>
                <h1 className="heading !text-5xl">
                    Upgrade your Startup Pitch
                </h1>
            </section>
            <StartUpForm StartUpId={id} />
        </main>
    )
}

export default StartUpEditPage
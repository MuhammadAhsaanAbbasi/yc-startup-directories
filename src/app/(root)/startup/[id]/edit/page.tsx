import StartUpForm from '@/components/startup/StartUpForm'
import React from 'react'

interface params {
    params: Promise<{
        id: string
    }>
}

const StartUpEditPage = async ({ params }: params) => {
    const id = (await params).id
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
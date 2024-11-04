import StartUpForm from '@/components/startup/StartUpForm'
import React from 'react'
import { auth } from '../../../../../auth';
import { redirect } from 'next/navigation';

const StartUpCreatePage = async () => {
    const session = await auth();

    if (!session) redirect("/");
    return (
        <main>
            <section className='orange_container'>
                <h1 className="heading !text-5xl">
                    Pitch & Submit <br /> your Startup
                </h1>
            </section>
            <StartUpForm />
        </main>
    )
}

export default StartUpCreatePage
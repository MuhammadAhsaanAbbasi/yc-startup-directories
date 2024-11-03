import CreateStartUpForm from '@/components/startup/CreateStartUpForm'
import React from 'react'

const StartUpCreatePage = () => {
    return (
        <main>
            <section className='orange_container'>
                <h1 className="heading !text-5xl">
                    Pitch & Submit <br /> your Startup
                </h1>
            </section>
            <CreateStartUpForm />
        </main>
    )
}

export default StartUpCreatePage
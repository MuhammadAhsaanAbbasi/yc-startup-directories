import Header from '@/components/navigation/Header'
import React from 'react'

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <main className='font-work-sans'>
            <Header />
            {children}
        </main>
    )
}

export default RootLayout
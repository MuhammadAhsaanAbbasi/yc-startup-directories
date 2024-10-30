import Image from 'next/image'
import React from 'react'
import YC from "@/../public/yc-logo.svg"
import Link from 'next/link'
import { auth, signOut, signIn } from '@/../auth'
import { Button } from '../ui/button'
import NavItem from './NavItem'

const Header = async () => {
    const session = await auth();
    return (
        <header className='px-6 py-3 bg-white shadow-sm font-work-sans flex justify-between items-center gap-4'>
            <Link href={"/"}>
                <Image
                    src={YC}
                    alt="YC Logo"
                    height={50}
                    width={150}
                    className='h-20 sm:h-auto'
                />
            </Link>
            <nav className='flex items-center gap-3 sm:gap-5 text-black'>
                {
                    session && session.user ? (
                        <NavItem user={session.user} signOut={
                            async () => {
                                "use server";
                                await signOut({ redirectTo: "/" });
                            }
                        } />
                    ) : (
                        <form action={
                            async () => {
                                "use server";
                                await signIn("github");
                            }
                        }>
                            <Button variant={"outline"}
                            className='text-xl font-medium'
                                type="submit">
                                SignIn
                            </Button>
                        </form>
                    )
                }
            </nav>
        </header>
    )
}

export default Header
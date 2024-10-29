import Image from 'next/image'
import React from 'react'
import YC from "@/../public/yc-logo.svg"
import Link from 'next/link'
import { auth, signOut, signIn } from '@/../auth'

const Header = async () => {
    const session = await auth();
    return (
        <header className='px-5 py-3 bg-white shadow-sm font-work-sans flex justify-between items-center'>
            <Link href={"/"}>
                <Image
                    src={YC}
                    alt="YC Logo"
                    height={40}
                    width={145}
                />
            </Link>
            <nav className='flex items-center gap-5 text-black'>
                {
                    session && session.user ? (
                        <>
                            <Link href={"/startup/create"}>
                                <button>
                                    <span>Create</span>
                                </button>
                            </Link>
                            <form action={
                                async () => {
                                    "use server";
                                    await signOut({redirectTo: "/"});
                                }
                            }>
                            <button type="submit">
                                <span>Logout</span>
                            </button>
                            </form>
                            <Link href={`/user/${session.user.id}`}>
                                {session.user.name}
                            </Link>
                        </>
                    ) : (
                        <form action={
                            async () => {
                                "use server";
                                await signIn("github");
                            }
                        }>
                            <button type="submit">
                                SignIn
                            </button>
                        </form>
                    )
                }
            </nav>
        </header>
    )
}

export default Header
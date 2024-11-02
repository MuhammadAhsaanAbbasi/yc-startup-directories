"use client";
import Link from 'next/link';
import React, { useTransition } from 'react'
import { Button } from '../ui/button';
import { BadgePlus, LoaderCircle, LogOut, Settings } from 'lucide-react';
import Image from 'next/image';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


interface NavItemProps {
    user: UserProps
    signOut: () => Promise<void>
}

const NavItem = ({ user, signOut }: NavItemProps) => {
    const [isPending, startTransition] = useTransition();

    const onSubmit = async () => {
        startTransition(async () => {
            await signOut();
        });
    }
    return (
        <>
            <Link href={"/startup/create"}>
                <Button className='text-xl font-medium'>
                    <span className="max-sm:hidden">Create</span>
                    <BadgePlus className="size-6 sm:hidden" />
                </Button>
            </Link>

            <DropdownMenu>
                <DropdownMenuTrigger className="focus-visible:outline-none">
                    <div className="flex h-[45px] w-[45px] shrink-0 overflow-hidden rounded-full">
                        <Image
                            src={user.image || "/default-avatar.png"}
                            alt={user.name || "User"}
                            height={50}
                            width={50}
                            className="aspect-square h-full w-full"
                        />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 p-4 mx-2 rounded-lg border shadow-lg bg-white-100 text-primary">
                    <div className="flex items-center gap-2">
                        <div className="flex h-11 w-11 shrink-0 overflow-hidden rounded-full">
                            <Image
                                src={user.image || "/default-avatar.png"}
                                alt={user.name || "User"}
                                height={50}
                                width={50}
                                className="aspect-square h-full w-full"
                            />
                        </div>
                        <div className='flex flex-col justify-center gap-0'>
                            <div className="text-lg font-semibold">{user.name || "Username"}</div>
                            <div className="text-sm text-gray-500">{user.email || "user@example.com"}</div>
                        </div>
                    </div>
                    <DropdownMenuSeparator className="my-2 border-t border-gray-200" />
                    <DropdownMenuItem className="hover:bg-gray-100 p-2 rounded-md">
                        <Link href={`/user/${user.id}`} className="flex items-center gap-2">
                            <Settings className="h-6 w-6" />
                            <span className='font-medium text-[16px]'>Manage account</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="my-2 border-t border-gray-200" />
                    <DropdownMenuItem className="hover:bg-gray-100 p-2 rounded-md">
                        <form action={onSubmit}>
                            <Button
                                variant={"outline"}
                                type="submit"
                                className="flex items-center gap-2 w-full justify-start"
                            >
                                {
                                    isPending ? (
                                    <LoaderCircle className='animate-spin' /> 
                                    ): (
                                    <LogOut className="h-6 w-6" />
                                    )
                                }
                                <span className='font-medium text-[16px]'>Sign out</span>
                            </Button>
                        </form>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default NavItem
"use client";
import React from 'react'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import Link from 'next/link';

const ResetSearchForm = () => {
    const resetForm = () => {
        const form = document.querySelector('.search-form') as HTMLFormElement;

        if(form) form.reset();
    }
    return (
        <Button type="reset" className="search-btn text-white" onClick={resetForm}>
            <Link href="/">
                <X className="size-5" />
            </Link>
        </Button>
    )
}

export default ResetSearchForm
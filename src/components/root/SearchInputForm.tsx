import React from 'react'
import Form from "next/form"
import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import ResetSearchForm from './ResetSearchForm'
import { Input } from '../ui/input'

const SearchInput = ({ query }: { query?: string }) => {
    return (
        <Form action={"/"} scroll={false} className='search-form'>
            <Input
                name="query"
                defaultValue={query}
                className="search-input"
                placeholder='Search StartUps'
            />
            <div className="flex items-center gap-2">
                {
                    query && <ResetSearchForm />
                }
                <Button type="submit" className='search-btn'>
                    <Search className='size-6' />
                </Button>
            </div>
        </Form>
    )
}

export default SearchInput
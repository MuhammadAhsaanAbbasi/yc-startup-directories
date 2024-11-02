import React from 'react'
import Ping from '@/components/shared/Ping'

const Views = async ({id}: {id: string}) => {
    console.log(id)
    return (
        <div className='view-container'>
            <div className='absolute -top-2 -right-2'>
                <Ping />
            </div>
            <p className='view-text'>
                <span className='font-black'>Views: 55</span>
            </p>
        </div>
    )
}

export default Views
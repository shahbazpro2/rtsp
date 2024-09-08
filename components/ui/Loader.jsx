import { LoaderCircle } from 'lucide-react'
import React from 'react'

const Loader = () => {
    return (
        <div>
            <LoaderCircle className='animate-spin size-10' />
        </div>
    )
}

export default Loader
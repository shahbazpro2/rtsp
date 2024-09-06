'use client'
import { useSocketEvents } from '@/hooks/useSocketEvents'
import { Axios } from 'use-hook-api'

const PreConfig = () => {
    useSocketEvents()

    Axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL

    return null
}

export default PreConfig

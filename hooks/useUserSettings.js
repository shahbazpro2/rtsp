import { getUserSettings } from '@/apis/settings'
import { useApi } from 'use-hook-api'

const useUserSettings = () => {
    const [, res] = useApi({ cache: 'userSettings' }, getUserSettings())
    return res
}

export default useUserSettings

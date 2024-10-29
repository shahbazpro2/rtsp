import { getUserSettings } from '@/apis/settings'

const useUserSettings = () => {
    const [, res] = useApi({ cache: 'userSettings' }, getUserSettings())
    return res
}

export default useUserSettings

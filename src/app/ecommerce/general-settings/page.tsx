import GeneralSettingList from '@/features/pages/settings/general-settings'
import { getTaxes } from '@/services/settings-service'

export default async function GeneralSettingPage() {
    let taxes = []
    try {
        const res = await getTaxes()
        taxes = res ? res.data : []
    } catch (error) {
        console.error('Fetch error:', error);
    }
    return (
        <GeneralSettingList taxesData={taxes} />
    )

}
import EmployeeSettings from '@/features/pages/employee-management/settings'
// import { getTaxes } from '@/services/settings-service'

export default async function EmployeeSettingPage() {
    // let taxes = []
    // try {
    //     const res = await getTaxes()
    //     taxes = res ? res.data : []
    // } catch (error) {
    //     console.error('Fetch error:', error);
    // }
    return (
        <EmployeeSettings />
    )

}
import TemplateList from '@/features/pages/settings/template-settings'

export default async function TemplatePage() {
    // let taxes = []
    // try {
    //     const res = await getTaxes()
    //     taxes = res ? res.data : []
    // } catch (error) {
    //     console.error('Fetch error:', error);
    // }
    return (
        <TemplateList />
    )

}
import React, { useState } from 'react'
import { CalculatorOutlined } from '@ant-design/icons'
import FormGroup from '@/components/form'
import Input from "@/components/input"
import Button from "@/components/button"
import { ChildFormProps } from '@/plugins/types/form-type'
import { getPriceLevel } from '@/services/price-level-service'
import { mathFloor } from '@/plugins/validators/common-rules'
import { useNotificationAntd } from '@/components/toast'

const PriceInformation = ({
    dataById,
    onChange,
    formDataCreate
}: ChildFormProps) => {
    const { contextHolder, notifyError } = useNotificationAntd()
    const handleChange = (e: any) => {
        const { id, value } = e.target;
        const updated = { ...formDataCreate.tab_price, [id]: value }
        onChange(updated)
        // setFormData(prev => {
        //     const updated = { ...prev, [id]: value }
        //     onChange(updated)
        //     return updated
        // });
    };

    const handleCalculate = async () => {
        try {
            const brandId = formDataCreate?.tab_basic_information?.brand
            const categoryId = formDataCreate?.tab_basic_information?.categories
            const res = await getPriceLevel()
            if (res.data) {
                const priceLevel = res.data.filter((item: any) => {
                    return item.brandId == brandId && item.categoryId == categoryId || null
                })
                if (priceLevel[0]) {
                    const buying_price = Number(formDataCreate.tab_price.buying_price)
                    formDataCreate.tab_price.rrp = buying_price ? mathFloor(buying_price * (1 + (priceLevel[0].rrp_price || 0) / 100)) : 0
                    formDataCreate.tab_price.trade = buying_price ? mathFloor(buying_price * (1 + (priceLevel[0].trade_price || 0) / 100)) : 0
                    formDataCreate.tab_price.silver = buying_price ? mathFloor(buying_price * (1 + (priceLevel[0].silver_price || 0) / 100)) : 0
                    formDataCreate.tab_price.gold = buying_price ? mathFloor(buying_price * (1 + (priceLevel[0].gold_price || 0) / 100)) : 0
                    formDataCreate.tab_price.platinum = buying_price ? mathFloor(buying_price * (1 + (priceLevel[0].platinum_price || 0) / 100)) : 0
                    formDataCreate.tab_price.diamond = buying_price ? mathFloor(buying_price * (1 + (priceLevel[0].diamond_price || 0) / 100)) : 0
                } else {
                    notifyError("Price Level does'nt available. Please input manually")
                    formDataCreate.tab_price.rrp = 0
                    formDataCreate.tab_price.trade = 0
                    formDataCreate.tab_price.silver = 0
                    formDataCreate.tab_price.gold = 0
                    formDataCreate.tab_price.platinum = 0
                    formDataCreate.tab_price.diamond = 0
                }
            }

        } catch (error) {
            console.error(error)

        }
    }
    return (
        <div>
            {contextHolder}
            <FormGroup
                title="Price"
                description="Price information"
            >
                <Input
                    id='buying_price'
                    label='Buying Price'
                    type='text'
                    placeholder='Input Buying Price'
                    onChange={handleChange}
                    value={formDataCreate?.tab_price?.buying_price}
                />
                <Input
                    id='rrp'
                    label='RRP'
                    type='text'
                    placeholder='Input RRP'
                    onChange={handleChange}
                    value={formDataCreate?.tab_price?.rrp}
                />
                <Input
                    id='trade'
                    label='Trade'
                    type='text'
                    placeholder='Input Trade'
                    onChange={handleChange}
                    value={formDataCreate?.tab_price?.trade}
                />
                <Input
                    id='silver'
                    label='Silver'
                    type='text'
                    placeholder='Input Silver'
                    onChange={handleChange}
                    value={formDataCreate?.tab_price?.silver}
                />
                <Input
                    id='gold'
                    label='Gold'
                    type='text'
                    placeholder='Input Gold'
                    onChange={handleChange}
                    value={formDataCreate?.tab_price?.gold}
                />
                <Input
                    id='platinum'
                    label='Platinum'
                    type='text'
                    placeholder='Input Platinum'
                    onChange={handleChange}
                    value={formDataCreate?.tab_price?.platinum}
                />
                <Input
                    id='diamond'
                    label='Diamond'
                    type='text'
                    placeholder='Input Diamond'
                    onChange={handleChange}
                    value={formDataCreate?.tab_price?.diamond}
                />
                {/* <Input
                    id='kitPrice'
                    label='Kit Price'
                    type='text'
                    placeholder='Input Kit Price'
                    onChange={handleChange}
                    value={formDataCreate?.tab_price?.kit_price}
                />
                <Input
                    id='notes'
                    label='Price Notes'
                    type='text'
                    placeholder='Input Price Notes'
                    onChange={handleChange}
                    value={formDataCreate?.tab_price?.price_notes}
                /> */}


            </FormGroup>
            <div className='flex justify-end gap-3'>
                <Button
                    label='Calculate'
                    btnClassname="!bg-[#86A788] !text-white hover:!bg-[var(--btn-hover-bg)] hover:!text-[#86A788] hover:!border-[#86A788]"
                    icon={<CalculatorOutlined />}
                    onClick={handleCalculate}
                />
                <Button
                    label='View Price History'
                    btnClassname="!bg-[#86A788] !text-white hover:!bg-[var(--btn-hover-bg)] hover:!text-[#86A788] hover:!border-[#86A788]"
                />
                <Button
                    label='Save'
                    btnClassname="!bg-[#86A788] !text-white hover:!bg-[var(--btn-hover-bg)] hover:!text-[#86A788] hover:!border-[#86A788]"
                />
            </div>
            <hr style={{ borderColor: '#E5E7EB', marginTop: '1rem', marginBottom: '1rem' }} />

        </div>
    )
}

export default PriceInformation

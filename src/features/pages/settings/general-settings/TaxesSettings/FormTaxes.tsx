import React, { useState, useEffect } from 'react'
import Modal from '@/components/modal'
import Input from '@/components/input'
import Textarea from '@/components/textarea'
import { PercentageOutlined } from '@ant-design/icons'
import { addTaxes, updateTaxes } from '@/services/settings-service'

type TaxesForm = {
    open: boolean
    handleCancel: () => void
    onSuccess?: any
    databyId?: any
}
const FormTaxes = ({
    open = false,
    handleCancel,
    onSuccess,
    databyId
}: TaxesForm) => {
    const [taxData, setTaxData] = useState({
        name: '',
        description: '',
        value: 0
    })

    console.log(databyId?.name, taxData)

    const handleChange = (e: any) => {
        const { id, value } = e.target
        const updated = { ...taxData, [id]: value }
        setTaxData(updated)
    }

    const handleSubmit = async () => {
        try {
            const data = {
                name: taxData.name ?? '',
                description: taxData.description ?? '',
                value: Number(taxData.value) ?? 0
            }

            let response
            if (databyId?.id) {
                response = await updateTaxes(databyId.id, data)
            } else {
                response = await addTaxes(data)

            }
            if (response.success == true) {
                onSuccess(response.message)
            }

        } catch (error) {
            console.error(error)
        }

    }

    useEffect(() => {
        if (databyId) {
            setTaxData({
                name: databyId.name,
                description: databyId.description,
                value: databyId.value
            })

        } else {
            setTaxData({
                name: '',
                description: '',
                value: 0
            })
        }

    }, [databyId, open])

    return (
        <Modal
            title='Create Tax'
            open={open}
            isBtnSave={true}
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
        >
            <div className='flex flex-col gap-2'>
                <Input
                    id='name'
                    label='Tax Name'
                    placeholder='Tax Name'
                    value={taxData.name}
                    type='text'
                    onChange={handleChange}
                />
                <Textarea
                    id='description'
                    label='Description'
                    placeholder='Description'
                    onChange={handleChange}
                    value={taxData.description}
                    notes='min.50 / max.65, Character 0'
                />
                <Input
                    id='value'
                    label='Value'
                    placeholder='Value'
                    value={taxData.value}
                    type='string'
                    onChange={handleChange}
                    suffix={<PercentageOutlined />}
                />
            </div>

        </Modal>
    )
}

export default FormTaxes

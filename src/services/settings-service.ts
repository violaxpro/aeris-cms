import baseService from "./base-service";
import { TaxType, TemplateType } from "@/plugins/types/settings-type";

const api = '/admin/setting/taxes'
const apiEmailTemplate = '/admin/setting/templates/email'
const apiSmsTemplate = '/admin/setting/templates/sms'


export async function getTaxes(param?: string | number) {
    try {
        const url = param ? `${api}/${param}` : api
        const res = await baseService.get(url)
        return res.data
    } catch (error) {
        console.error(error)
    }

}

export async function addTaxes(params: TaxType) {
    try {
        const res = await baseService.post(api, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export async function updateTaxes(id: string | number, params: TaxType) {
    try {
        const res = await baseService.put(`${api}/${id}`, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export async function deleteTaxes(id: string | number) {
    try {
        const res = await baseService.delete(`${api}/${id}`)
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export async function getEmailTemplate(param?: string | number) {
    try {
        const url = param ? `${apiEmailTemplate}/${param}` : apiEmailTemplate
        const res = await baseService.get(url)
        return res.data
    } catch (error) {
        console.error(error)
    }

}

export async function addEmailTemplate(params: TemplateType) {
    try {
        const res = await baseService.post(apiEmailTemplate, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export async function updateEmailTemplate(id: string | number, params: TemplateType) {
    try {
        const res = await baseService.put(`${apiEmailTemplate}/${id}`, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export async function deleteEmailTemplate(id: string | number) {
    try {
        const res = await baseService.delete(`${apiEmailTemplate}/${id}`)
        return res.data
    } catch (error) {
        console.error(error)
    }
}





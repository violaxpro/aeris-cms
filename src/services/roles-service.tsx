import baseService from "./base-service";
import { RolesType } from "@/plugins/types/users-type";

const api = '/admin/user/roles'

export async function getRoles(params?: string | number) {
    const res = await baseService(api, { params })
    return res.data
}

export async function addRole(params: RolesType) {
    try {
        const res = await baseService.post(api, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export async function updateRole(id: string | number, params: RolesType) {
    try {
        const res = await baseService.put(`${api}/${id}`, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}


export async function deleteRole(id: string | number) {
    try {
        const res = await baseService.delete(`${api}/${id}`)
        return res.data
    } catch (error) {
        console.error(error)
    }
}






import baseService from "./base-service";
import { UserType } from "@/plugins/types/users-type";

const api = '/admin/user/admins'

export async function getUsers(param?: string | number) {
    const url = param ? `${api}/${param}` : api
    const res = await baseService(url)
    return res.data
}

export async function getUserbyId(param?: string | number) {
    const url = param ? `${api}/detail/${param}` : api
    const res = await baseService(url)
    return res.data
}


export async function addUser(params: UserType) {
    try {
        const res = await baseService.post(api, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export async function updateUser(id: string | number, params: UserType) {
    try {
        const res = await baseService.put(`${api}/${id}`, params)
        return res.data
    } catch (error) {
        console.error(error)
    }
}


export async function deleteUser(id: string | number) {
    try {
        const res = await baseService.delete(`${api}/${id}`)
        return res.data
    } catch (error) {
        console.error(error)
    }
}






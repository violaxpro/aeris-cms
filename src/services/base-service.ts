import axios from 'axios'
import { env } from '@/env.mjs'


const baseService = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API,
})
const bearerToken = process.env.NEXT_PUBLIC_AUTHORIZATION

baseService.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${bearerToken}`
        config.headers.accept = 'application/json'
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default baseService

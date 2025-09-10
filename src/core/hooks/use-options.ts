

import {
    getOptions,
    getOptionsById,
    addOptions,
    updateOptions,
    deleteOptions
} from "@/services/options-service";
import { useMutation, useQuery } from '@tanstack/react-query';
import { routes } from "@/config/routes";
import { useMutationBase } from "./mutation-base";

export function useGetOption(page: number, perPage: number) {
    return useQuery({
        queryKey: ['options', page, perPage],
        queryFn: async () => getOptions({ page, perPage }),
    });
}

export function useGetOptionById(slug: string) {
    return useQuery({
        queryKey: ['options', slug],
        queryFn: async () => getOptionsById(slug),
        enabled: !!slug,
    });
}

export function useCreateOption() {
    const { router, queryClient, setNotification } = useMutationBase();
    return useMutation({
        mutationFn: addOptions,
        onSuccess: (res) => {
            setNotification(res.message)
            queryClient.invalidateQueries({ queryKey: ['options'] })
            router.push(routes.eCommerce.options)
        },
        onError: (error: any) => {
            setNotification(error?.response?.data?.message)
        }
    });
}

export function useUpdateOption(slug: string | number) {
    const { router, queryClient, setNotification } = useMutationBase();
    return useMutation({
        mutationFn: (data: any) => updateOptions(slug, data),
        onSuccess: (res) => {
            setNotification(res.message)
            queryClient.invalidateQueries({ queryKey: ['options'] })
            router.push(routes.eCommerce.options)
        },
        onError: (error: any) => {
            setNotification(error?.response?.data?.message)
        }
    });
}

export function useDeleteOption() {
    const { queryClient, setNotification } = useMutationBase();
    return useMutation({
        mutationFn: (id: number) => deleteOptions(id),
        onSuccess: (res) => {
            setNotification(res.message)
            queryClient.invalidateQueries({ queryKey: ['options'] })
        },
        onError: (error: any) => {
            setNotification(error?.response?.data?.message)
        }
    })
}

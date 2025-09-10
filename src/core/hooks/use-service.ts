

import { getServices, getServiceById, deleteService, addService, updateService } from '@/services/services-service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { routes } from "@/config/routes";
import { useMutationBase } from "./mutation-base";

export function useGetService(page: number, perPage: number) {
    return useQuery({
        queryKey: ['services', page, perPage],
        queryFn: async () => getServices({ page, perPage }),
    });
}

export function useGetServiceById(slug: string) {
    return useQuery({
        queryKey: ['services', slug],
        queryFn: async () => getServiceById(slug),
        enabled: !!slug,
    });
}

export function useCreateService() {
    const { router, queryClient, setNotification } = useMutationBase();
    return useMutation({
        mutationFn: addService,
        onSuccess: (res) => {
            setNotification(res.message)
            queryClient.invalidateQueries({ queryKey: ['services'] })
            router.push(routes.eCommerce.services)
        },
        onError: (error: any) => {
            setNotification(error?.response?.data?.message)
        }
    });
}

export function useUpdateService(slug: string | number) {
    const { router, queryClient, setNotification } = useMutationBase();
    return useMutation({
        mutationFn: (data: any) => updateService(slug, data),
        onSuccess: (res) => {
            setNotification(res.message)
            queryClient.invalidateQueries({ queryKey: ['services'] })
            router.push(routes.eCommerce.services)

        },
        onError: (error: any) => {
            setNotification(error?.response?.data?.message)
        }
    });
}

export function useDeleteService() {
    const { queryClient, setNotification } = useMutationBase();
    return useMutation({
        mutationFn: (id: number) => deleteService(id),
        onSuccess: (res) => {
            setNotification(res.message)
            queryClient.invalidateQueries({ queryKey: ['services'] })
        },
        onError: (error: any) => {
            setNotification(error?.response?.data?.message)
        }
    })
}

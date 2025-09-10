
import {
    getAttributes,
    getAttributebyId,
    addAttribute,
    updateAttribute,
    deleteAttribute
} from "@/services/attributes-service";
import { AttributesType } from "@/data/attributes-data";
import { useMutation, useQuery } from '@tanstack/react-query';
import { routes } from "@/config/routes";
import { useMutationBase } from "./mutation-base";

export function useGetAttribute(page: number, perPage: number) {
    return useQuery({
        queryKey: ['attributes', page, perPage],
        queryFn: async () => getAttributes({ page, perPage }),
    });
}

export function useGetAttributeById(slug: string) {
    return useQuery({
        queryKey: ['attributes', slug],
        queryFn: async () => getAttributebyId(slug),
        enabled: !!slug,
    });
}

export function useCreateAttribute() {
    const { router, queryClient, setNotification } = useMutationBase();
    return useMutation({
        mutationFn: addAttribute,
        onSuccess: (res) => {
            setNotification(res.message)
            queryClient.invalidateQueries({ queryKey: ['attributes'] })
            router.push(routes.eCommerce.attributes)
        },
        onError: (error: any) => {
            setNotification(error?.response?.data?.message)
        }
    });
}

export function useUpdateAttribute(slug: string | number) {
    const { router, queryClient, setNotification } = useMutationBase();
    return useMutation({
        mutationFn: (data: AttributesType) => updateAttribute(slug, data),
        onSuccess: (res) => {
            setNotification(res.message)
            queryClient.invalidateQueries({ queryKey: ['attributes'] })
            router.push(routes.eCommerce.attributes)
        },
        onError: (error: any) => {
            setNotification(error?.response?.data?.message)
        }
    });
}

export function useDeleteAttribute() {
    const { queryClient, setNotification } = useMutationBase();
    return useMutation({
        mutationFn: (id: number) => deleteAttribute(id),
        onSuccess: (res) => {
            setNotification(res.message)
            queryClient.invalidateQueries({ queryKey: ['attributes'] })
        },
        onError: (error: any) => {
            setNotification(error?.response?.data?.message)
        }
    })
}

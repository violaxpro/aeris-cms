

import { getTags, addTags, updateTags, deleteTags, getTagsById } from "@/services/tags-service";
import { useMutation, useQuery } from '@tanstack/react-query';
import { routes } from "@/config/routes";
import { useMutationBase } from "./mutation-base";

export function useGetTag(page: number, perPage: number) {
    return useQuery({
        queryKey: ['tags', page, perPage],
        queryFn: async () => getTags({ page, perPage }),
    });
}

export function useGetTagById(slug: string) {
    return useQuery({
        queryKey: ['tags', slug],
        queryFn: async () => getTagsById(slug),
        enabled: !!slug,
    });
}

export function useCreateTag() {
    const { router, queryClient, setNotification } = useMutationBase();
    return useMutation({
        mutationFn: addTags,
        onSuccess: (res) => {
            setNotification(res.message)
            queryClient.invalidateQueries({ queryKey: ['tags'] })
            router.push(routes.eCommerce.tags)
        },
        onError: (error: any) => {
            setNotification(error?.response?.data?.message)
        }
    });
}

export function useUpdateTag(slug: string | number) {
    const { router, queryClient, setNotification } = useMutationBase();
    return useMutation({
        mutationFn: (data: any) => updateTags(slug, data),
        onSuccess: (res) => {
            setNotification(res.message)
            queryClient.invalidateQueries({ queryKey: ['tags'] })
            router.push(routes.eCommerce.tags)
        },
        onError: (error: any) => {
            setNotification(error?.response?.data?.message)
        }
    });
}

export function useDeleteTag() {
    const { queryClient, setNotification } = useMutationBase();
    return useMutation({
        mutationFn: (id: number) => deleteTags(id),
        onSuccess: (res) => {
            setNotification(res.message)
            queryClient.invalidateQueries({ queryKey: ['tags'] })
        },
        onError: (error: any) => {
            setNotification(error?.response?.data?.message)
        }
    })
}

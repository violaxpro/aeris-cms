

import { getCategories, getCategorybyId, addCategory, updateCategory, deleteCategory } from '@/services/category-service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { routes } from "@/config/routes";
import { useMutationBase } from "./mutation-base";

export function useGetCategory(page: number, perPage: number) {
    return useQuery({
        queryKey: ['categories', page, perPage],
        queryFn: async () => getCategories({ page, perPage }),
    });
}

export function useGetCategoryById(slug: string) {
    return useQuery({
        queryKey: ['categories', slug],
        queryFn: async () => getCategorybyId(slug),
        enabled: !!slug,
    });
}

export function useCreateCategory() {
    const { router, queryClient, setNotification } = useMutationBase();
    return useMutation({
        mutationFn: addCategory,
        onSuccess: (res) => {
            setNotification(res.message)
            queryClient.invalidateQueries({ queryKey: ['categories'] })
        },
        onError: (error: any) => {
            setNotification(error?.response?.data?.message)
        }
    });
}

export function useUpdateCategory(slug: string | number) {
    const { router, queryClient, setNotification } = useMutationBase();
    return useMutation({
        mutationFn: (data: any) => updateCategory(slug, data),
        onSuccess: (res) => {
            setNotification(res.message)
            queryClient.invalidateQueries({ queryKey: ['categories'] })
        },
        onError: (error: any) => {
            setNotification(error?.response?.data?.message)
        }
    });
}

export function useDeleteCategory() {
    const { queryClient, setNotification } = useMutationBase();
    return useMutation({
        mutationFn: (id: number) => deleteCategory(id),
        onSuccess: (res) => {
            setNotification(res.message)
            queryClient.invalidateQueries({ queryKey: ['categories'] })
        },
        onError: (error: any) => {
            setNotification(error?.response?.data?.message)
        }
    })
}

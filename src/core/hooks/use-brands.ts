
import {
    getBrands,
    getBrandById,
    addBrand,
    updateBrand,
    deleteBrand
} from "@/services/brands-service";
import { useMutation, useQuery } from '@tanstack/react-query';
import { routes } from "@/config/routes";
import { BrandType } from "@/data/brands-data";
import { useMutationBase } from "./mutation-base";

export function useGetBrand(page: number, perPage: number) {
    return useQuery({
        queryKey: ['brands', page, perPage],
        queryFn: async () => getBrands({ page, perPage }),
    });
}

export function useGetBrandById(slug: string) {
    return useQuery({
        queryKey: ['brands', slug],
        queryFn: async () => getBrandById(slug),
        enabled: !!slug,
    });
}

export function useCreateBrand() {
    const { router, queryClient, setNotification } = useMutationBase();
    return useMutation({
        mutationFn: addBrand,
        onSuccess: (res) => {
            setNotification(res.message)
            queryClient.invalidateQueries({ queryKey: ['brands'] })
            router.push(routes.eCommerce.brands)
        },
        onError: (error: any) => {
            setNotification(error?.response?.data?.message)
        }
    });
}

export function useUpdateBrand(slug: string | number) {
    const { router, queryClient, setNotification } = useMutationBase();
    return useMutation({
        mutationFn: (data: BrandType) => updateBrand(slug, data),
        onSuccess: (res) => {
            setNotification(res.message)
            queryClient.invalidateQueries({ queryKey: ['brands'] })
            router.push(routes.eCommerce.brands)
        },
        onError: (error: any) => {
            setNotification(error?.response?.data?.message)
        }
    });
}

export function useDeleteBrand() {
    const { queryClient, setNotification } = useMutationBase();
    return useMutation({
        mutationFn: (id: number) => deleteBrand(id),
        onSuccess: (res) => {
            setNotification(res.message)
            queryClient.invalidateQueries({ queryKey: ['brands'] })
        },
        onError: (error: any) => {
            setNotification(error?.response?.data?.message)
        }
    })
}

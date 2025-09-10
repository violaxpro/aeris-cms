
import {
    getPriceLevel,
    addPriceLevel,
    getPriceLevelById,
    updatePriceLevel,
    deletePriceLevel
} from '@/services/price-level-service';
import { PriceLevelType } from '@/data/price-level-data';
import { useMutation, useQuery } from '@tanstack/react-query';
import { routes } from "@/config/routes";
import { useMutationBase } from "./mutation-base";

export function useGetPriceLevel(page: number, perPage: number) {
    return useQuery({
        queryKey: ['price-levels', page, perPage],
        queryFn: async () => getPriceLevel({ page, perPage }),
    });
}

export function useGetPriceLevelById(slug: string) {
    return useQuery({
        queryKey: ['price-levels', slug],
        queryFn: async () => getPriceLevelById(slug),
        enabled: !!slug,
    });
}

export function useCreatePriceLevel() {
    const { router, queryClient, setNotification } = useMutationBase();
    return useMutation({
        mutationFn: addPriceLevel,
        onSuccess: (res) => {
            setNotification(res.message)
            queryClient.invalidateQueries({ queryKey: ['price-levels'] })
            router.push(routes.eCommerce.priceLevel)
        },
        onError: (error: any) => {
            setNotification(error?.response?.data?.message)
        }
    });
}

export function useUpdatePriceLevel(slug: string | number) {
    const { router, queryClient, setNotification } = useMutationBase();
    return useMutation({
        mutationFn: (data: PriceLevelType) => updatePriceLevel(slug, data),
        onSuccess: (res) => {
            setNotification(res.message)
            queryClient.invalidateQueries({ queryKey: ['price-levels'] })
            router.push(routes.eCommerce.priceLevel)
        },
        onError: (error: any) => {
            setNotification(error?.response?.data?.message)
        }
    });
}

export function useDeletePriceLevel() {
    const { queryClient, setNotification } = useMutationBase();
    return useMutation({
        mutationFn: (id: number) => deletePriceLevel(id),
        onSuccess: (res) => {
            setNotification(res.message)
            queryClient.invalidateQueries({ queryKey: ['price-levels'] })
        },
        onError: (error: any) => {
            setNotification(error?.response?.data?.message)
        }
    })
}

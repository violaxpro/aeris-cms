import {
    getOrder,
    addOrder,
    deleteOrder,
    updateOrder
} from "@/services/order-service";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNotificationAntd } from "@/components/toast";
import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";
import { OrderType } from "@/plugins/types/sales-type";

export function useGetOrder(page: number, perPage: number) {
    return useQuery({
        queryKey: ['orders', page, perPage],
        queryFn: async () => getOrder({ page, perPage }),
    });
}

export function useCreateOrder() {
    const router = useRouter()
    const queryClient = useQueryClient()
    const { notifySuccess, notifyError } = useNotificationAntd()
    return useMutation({
        mutationFn: addOrder,
        onSuccess: (res) => {
            notifySuccess(res.message)
            queryClient.invalidateQueries({ queryKey: ['orders'] })
            router.push(routes.eCommerce.order)
        },
        onError: (error: any) => {
            notifyError(error?.response?.data?.message)
        }
    });
}

export function useUpdateOrder(slug: string | number) {
    const router = useRouter()
    const queryClient = useQueryClient()
    const { notifySuccess, notifyError } = useNotificationAntd()
    return useMutation({
        mutationFn: (data: OrderType) => updateOrder(slug, data),
        onSuccess: (res) => {
            notifySuccess(res.message)
            queryClient.invalidateQueries({ queryKey: ['orders'] })
            router.push(routes.eCommerce.order)
        },
        onError: (error: any) => {
            notifyError(error?.response?.data?.message)
        }
    });
}

export function useDeleteOrder() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) => deleteOrder(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] })
        },
    })
}

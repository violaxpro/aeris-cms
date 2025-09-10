
import {
    getAttributeSet,
    addAttributeSet
} from "@/services/attribute-set-service";
import { useMutation, useQuery } from '@tanstack/react-query';
import { routes } from "@/config/routes";
import { useMutationBase } from "./mutation-base";

export function useGetAttributeSet(page?: number, perPage?: number) {
    return useQuery({
        queryKey: ['attributes-set', page, perPage],
        queryFn: async () => getAttributeSet({ page, perPage }),
    });
}

export function useCreateAttributeSet() {
    const { router, queryClient, setNotification } = useMutationBase();
    return useMutation({
        mutationFn: addAttributeSet,
        onSuccess: (res) => {
            setNotification(res.message)
            queryClient.invalidateQueries({ queryKey: ['attributes-set'] })
        },
        onError: (error: any) => {
            setNotification(error?.response?.data?.message)
        }
    });
}

import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { notificationAtom } from "@/store/NotificationAtom";
import { useQueryClient } from '@tanstack/react-query';

export function useMutationBase() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const setNotification = useSetAtom(notificationAtom);

    return { router, queryClient, setNotification };
}
import { notification } from 'antd';

export const useNotificationAntd = () => {
    const [api, contextHolder] = notification.useNotification();

    const notifySuccess = (message: string, description?: string) => {
        api.success({
            message,
            description,
            placement: 'topRight',
        });
    };

    const notifyError = (message: string, description?: string) => {
        api.error({
            message,
            description,
            placement: 'topRight',
        });
    };

    return {
        contextHolder,
        notifySuccess,
        notifyError,
    };
};

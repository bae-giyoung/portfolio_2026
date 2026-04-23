import { useSetAtom } from "jotai";
import { addToastAtom, type ToastType } from "@/atoms/atoms";

const DEFAULT_DURATION = 3500;

export function useToast() {
    const addToast = useSetAtom(addToastAtom);

    function toast(message: string, type: ToastType = 'info', duration = DEFAULT_DURATION) {
        addToast({ message, type, duration });
    }

    toast.success = (message: string, duration = DEFAULT_DURATION) =>
        addToast({ message, type: 'success', duration });

    toast.error = (message: string, duration = DEFAULT_DURATION) =>
        addToast({ message, type: 'error', duration });

    toast.warning = (message: string, duration = DEFAULT_DURATION) =>
        addToast({ message, type: 'warning', duration });

    toast.info = (message: string, duration = DEFAULT_DURATION) =>
        addToast({ message, type: 'info', duration });

    return toast;
}

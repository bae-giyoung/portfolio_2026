import { atom } from 'jotai';

//* == 토스트 Toast
export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface ToastItem {
    id: string;
    message: string;
    type: ToastType;
    duration: number;
}

export const toastListAtom = atom<ToastItem[]>([]);

export const addToastAtom = atom(
    null,
    (get, set, item: Omit<ToastItem, 'id'>) => {
        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        set(toastListAtom, [...get(toastListAtom), { ...item, id }]);
    }
);

export const removeToastAtom = atom(
    null,
    (get, set, id: string) => {
        set(toastListAtom, get(toastListAtom).filter(t => t.id !== id));
    }
);

//* == 모달 Modal
// 타입 정의
interface ModalState {
    isOpen: boolean;
    header: React.ReactNode | null;
    content: React.ReactNode | null;
}

// 모달 atom
export const modalStateAtom = atom<ModalState>({
    isOpen: false,
    header: null,
    content: null,
});

// 파생 - 모달 열고 내용 설정
export const openModalAtom = atom(
    null,
    (get, set, header?: React.ReactNode, content?: React.ReactNode) => {
        set(modalStateAtom, { isOpen: true, header, content });
    }
);

// 파생 - 모달 닫고 내용설정
export const closeModalAtom = atom(
    null,
    (get, set) => {
        set(modalStateAtom, { isOpen: false, header: null, content: null });
    }
);
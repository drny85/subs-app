import { Subscription } from '@/types';
import { create } from 'zustand';

type SubscriptionState = {
   subscription: Subscription | null | undefined;
   setSubscription: (subscription: Subscription | null) => void;
};

type ModalState = {
   isOpen: boolean;
   setIsOpen: (isOpen: boolean) => void;
};

export const useSubscription = create<SubscriptionState>((set) => ({
   subscription: null,
   setSubscription: (subscription: Subscription | null) =>
      set({ subscription }),
}));

export const useStudentsCount = create<{
   total: number;
   setTotal: (total: number) => void;
}>((set) => ({
   total: 0,
   setTotal: (total: number) => set({ total }),
}));

export const useModalState = create<ModalState>((set) => ({
   isOpen: false,
   setIsOpen: (isOpen: boolean) => set({ isOpen }),
}));

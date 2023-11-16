import { Subscription } from '@/types';
import { User } from 'firebase/auth';
import { create } from 'zustand';

type UserState = {
   user: User | null;
   setUser: (user: User | null) => void;
};

type SubscriptionState = {
   subscription: Subscription | null | undefined;
   setSubscription: (subscription: Subscription | null) => void;
};

export const useUserStore = create<UserState>((set) => ({
   user: null,
   setUser: (user: User | null) => set({ user }),
}));

export const useSubscription = create<SubscriptionState>((set) => ({
   subscription: null,
   setSubscription: (subscription: Subscription | null) =>
      set({ subscription }),
}));

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { setCookie, deleteCookie, getCookie } from 'cookies-next';

interface User {
    id: number;
    username: string;
    email: string;
    role: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (user: User, token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: (getCookie('auth-token') as string) || null,
            isAuthenticated: !!getCookie('auth-token'),
            login: (user, token) => {
                setCookie('auth-token', token, { maxAge: 60 * 60 * 24 }); // 24h
                set({ user, token, isAuthenticated: true });
            },
            logout: () => {
                deleteCookie('auth-token');
                set({ user: null, token: null, isAuthenticated: false });
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ user: state.user }), // Don't persist token in localStorage, use cookies
        }
    )
);

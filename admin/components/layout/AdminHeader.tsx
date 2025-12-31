"use client";

import { useState, useEffect } from "react";
import { LogOut, Bell, Search, Sun, Moon } from "lucide-react";
import { useAuthStore } from "@/lib/store/auth.store";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/providers/ThemeProvider";

export function AdminHeader() {
    const router = useRouter();
    const { user, logout } = useAuthStore();
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <header className="flex h-16 items-center justify-between border-b bg-card border-border px-8 transition-colors duration-300">
            <div className="flex w-96 items-center rounded-lg bg-muted px-3 py-2 transition-colors duration-300">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Rechercher..."
                    className="ml-2 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
            </div>
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleTheme}
                    className="rounded-full p-2 text-muted-foreground hover:bg-muted transition-colors duration-300"
                >
                    {mounted ? (theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />) : <div className="h-5 w-5" />}
                </button>
                <button className="relative rounded-full p-2 text-muted-foreground hover:bg-muted transition-colors duration-300">
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-card" />
                </button>
                <div className="h-8 w-px bg-border mx-2" />
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-foreground hidden sm:block">
                        {user?.username || "Admin"}
                    </span>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-red-500/10 hover:text-red-600 transition-colors duration-300"
                    >
                        <LogOut className="h-4 w-4" />
                        Déconnexion
                    </button>
                </div>
            </div>
        </header >
    );
}

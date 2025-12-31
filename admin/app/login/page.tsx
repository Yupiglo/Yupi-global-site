"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, AlertCircle, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import { useAuthStore } from "@/lib/store/auth.store";

export default function LoginPage() {
    const router = useRouter();
    const login = useAuthStore((state) => state.login);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await api.auth.login(formData);
            login(response.user, response.token);
            router.push("/");
        } catch (err: any) {
            setError(err.message || "Une erreur est survenue lors de la connexion");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="w-full max-w-md space-y-8 bg-card p-10 rounded-2xl shadow-xl shadow-black/5 border border-border">
                <div>
                    <div className="mx-auto flex h-24 w-full items-center justify-center mb-8">
                        {/* Light Mode Logo */}
                        <div className="h-20 w-64 dark:hidden flex items-center justify-center">
                            <img
                                src="/logos/logo.png"
                                alt="Yupi Global"
                                className="h-auto w-full max-w-[256px] object-contain"
                            />
                        </div>
                        {/* Dark Mode Logo */}
                        <div className="h-20 w-64 hidden dark:flex items-center justify-center">
                            <img
                                src="/logos/yupi-blanc.png"
                                alt="Yupi Global"
                                className="h-auto w-full max-w-[256px] object-contain"
                            />
                        </div>
                    </div>
                    <h2 className="mt-2 text-center text-3xl font-extrabold tracking-tight text-foreground">
                        Administration
                    </h2>
                    <p className="mt-2 text-center text-sm text-muted-foreground">
                        Connectez-vous pour gérer Yupi Global
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-muted-foreground mb-1">
                                Nom d'utilisateur
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    className="block w-full rounded-lg border border-border bg-muted/50 py-2.5 pl-10 pr-3 text-foreground placeholder:text-muted-foreground focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all sm:text-sm"
                                    placeholder="admin"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-muted-foreground mb-1">
                                Mot de passe
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Lock className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="block w-full rounded-lg border border-border bg-muted/50 py-2.5 pl-10 pr-3 text-foreground placeholder:text-muted-foreground focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all sm:text-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 rounded-lg bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400 border border-red-500/20">
                            <AlertCircle className="h-4 w-4 shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative flex w-full justify-center rounded-lg bg-violet-600 px-4 py-3 text-sm font-bold text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-all shadow-md shadow-violet-500/20 disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                "Se connecter"
                            )}
                        </button>
                    </div>
                </form>

                <div className="text-center mt-6">
                    <p className="text-xs text-muted-foreground">
                        &copy; 2025 Yupi Global. Tous droits réservés.
                    </p>
                </div>
            </div>
        </div>
    );
}

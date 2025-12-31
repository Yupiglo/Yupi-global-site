import { getCookie } from "cookies-next";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
    let token: string | undefined;

    // Essayer de récupérer le token depuis les cookies (côté client)
    if (typeof window !== "undefined") {
        try {
            token = getCookie("auth-token") as string | undefined;
        } catch (e) {
            console.warn("Could not get auth token from cookies:", e);
        }
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {}),
            ...options.headers,
        },
    });

    if (!response.ok) {
        if (response.status === 401 && typeof window !== "undefined" && !endpoint.includes("/auth/login")) {
            // Rediriger vers la page de login si non authentifié
            window.location.href = "/login";
            throw new Error("Session expirée. Veuillez vous reconnecter.");
        }

        let errorMessage = "Une erreur est survenue";
        try {
            const error = await response.json();
            errorMessage = error.error || error.message || errorMessage;
        } catch {
            // Si la réponse n'est pas du JSON, utiliser le message par défaut
            errorMessage = response.statusText || errorMessage;
        }

        throw new Error(errorMessage);
    }

    // Gérer les réponses 204 (No Content) qui n'ont pas de body
    if (response.status === 204) {
        return null;
    }

    // Vérifier si la réponse a du contenu avant de parser le JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        const text = await response.text();
        return text ? JSON.parse(text) : null;
    }

    return null;
}

export const api = {
    auth: {
        login: (data: any) => apiFetch("/auth/login", { method: "POST", body: JSON.stringify(data) }),
        getMe: () => apiFetch("/auth/me"),
    },
    pages: {
        getAll: () => apiFetch("/pages"),
        getOne: (slug: string) => apiFetch(`/pages/${slug}`),
        create: (data: any) => apiFetch("/pages", { method: "POST", body: JSON.stringify(data) }),
        update: (id: number, data: any) => apiFetch(`/pages/${id}`, { method: "PUT", body: JSON.stringify(data) }),
        delete: (id: number) => apiFetch(`/pages/${id}`, { method: "DELETE" }),
    },
    posts: {
        getAll: () => apiFetch("/posts"),
        getOne: (slug: string) => apiFetch(`/posts/${slug}`),
        create: (data: any) => apiFetch("/posts", { method: "POST", body: JSON.stringify(data) }),
        update: (id: number, data: any) => apiFetch(`/posts/${id}`, { method: "PUT", body: JSON.stringify(data) }),
        delete: (id: number) => apiFetch(`/posts/${id}`, { method: "DELETE" }),
    },
    portfolio: {
        getAll: () => apiFetch("/portfolio"),
        getOne: (slug: string) => apiFetch(`/portfolio/${slug}`),
        create: (data: any) => apiFetch("/portfolio", { method: "POST", body: JSON.stringify(data) }),
        update: (id: number, data: any) => apiFetch(`/portfolio/${id}`, { method: "PUT", body: JSON.stringify(data) }),
        delete: (id: number) => apiFetch(`/portfolio/${id}`, { method: "DELETE" }),
    },
    services: {
        getAll: () => apiFetch("/services"),
        getOne: (slug: string) => apiFetch(`/services/${slug}`),
        create: (data: any) => apiFetch("/services", { method: "POST", body: JSON.stringify(data) }),
        update: (id: number, data: any) => apiFetch(`/services/${id}`, { method: "PUT", body: JSON.stringify(data) }),
        delete: (id: number) => apiFetch(`/services/${id}`, { method: "DELETE" }),
    },
    members: {
        getAll: () => apiFetch("/members"),
        getOne: (id: number) => apiFetch(`/members/${id}`),
        updateStatus: (id: number, status: string) => apiFetch(`/members/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
        delete: (id: number) => apiFetch(`/members/${id}`, { method: "DELETE" }),
    },
    media: {
        getAll: () => apiFetch("/media"),
        create: (data: any) => apiFetch("/media", { method: "POST", body: JSON.stringify(data) }),
        delete: (id: number) => apiFetch(`/media/${id}`, { method: "DELETE" }),
    },
    settings: {
        getBanner: async () => {
            const res = await fetch("/api/settings/banner");
            if (!res.ok) throw new Error("Failed to fetch banner settings");
            return res.json();
        },
        updateBanner: async (data: any) => {
            const res = await fetch("/api/settings/banner", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error("Failed to update banner settings");
            return res.json();
        },
    },
};

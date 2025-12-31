"use client";

import { useState, useEffect } from "react";
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit,
    Trash2,
    ExternalLink
} from "lucide-react";
import { api } from "@/lib/api";
import Link from "next/link";

export default function PagesListPage() {
    const [pages, setPages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock data for initial development if API fails
        const mockPages = [
            { id: 1, title: "Accueil", slug: "home", status: "published", updatedAt: "2025-12-28" },
            { id: 2, title: "À Propos", slug: "about", status: "published", updatedAt: "2025-12-29" },
            { id: 3, title: "Services", slug: "services", status: "published", updatedAt: "2025-12-25" },
            { id: 4, title: "Santé Premium", slug: "health-premium", status: "draft", updatedAt: "2025-12-30" },
        ];

        api.pages.getAll()
            .then(data => setPages(data))
            .catch(() => setPages(mockPages))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Pages</h1>
                    <p className="text-muted-foreground text-sm">Gérez les pages statiques du site yupiglobal.net.</p>
                </div>
                <Link
                    href="/pages/new"
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"
                >
                    <Plus className="h-4 w-4" />
                    Nouvelle Page
                </Link>
            </div>

            <div className="rounded-xl bg-card shadow-sm border border-border overflow-hidden transition-colors duration-300">
                <div className="flex items-center justify-between border-b border-border p-4">
                    <div className="flex w-72 items-center rounded-lg bg-muted px-3 py-1.5 border border-border focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400 transition-all duration-300">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Rechercher une page..."
                            className="ml-2 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                        />
                    </div>
                    <button className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors duration-300">
                        <Filter className="h-4 w-4" />
                        Filtrer
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-muted/50 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            <tr>
                                <th className="px-6 py-4">Titre</th>
                                <th className="px-6 py-4">Slug</th>
                                <th className="px-6 py-4">Statut</th>
                                <th className="px-6 py-4">Dernière modification</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground">Chargement...</td>
                                </tr>
                            ) : pages.map((page) => (
                                <tr key={page.id} className="hover:bg-muted/30 transition-colors duration-300 group">
                                    <td className="px-6 py-4">
                                        <span className="font-semibold text-foreground leading-tight">{page.title}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground font-mono">/{page.slug}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${page.status === "published"
                                            ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
                                            : "bg-muted text-muted-foreground border border-border"
                                            }`}>
                                            {page.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">{page.updatedAt}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <Link 
                                                href={`/pages/edit/${page.id}`}
                                                title="Éditer" 
                                                className="p-1.5 text-muted-foreground hover:text-blue-600 hover:bg-blue-500/10 rounded-md transition-colors"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                            <a 
                                                href={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://yupiglobal.net'}/${page.slug}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="Voir sur le site" 
                                                className="p-1.5 text-muted-foreground hover:text-blue-600 hover:bg-blue-500/10 rounded-md transition-colors"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                            </a>
                                            <button 
                                                title="Supprimer" 
                                                className="p-1.5 text-muted-foreground hover:text-red-600 hover:bg-red-500/10 rounded-md transition-colors"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <button className="p-1 text-muted-foreground lg:hidden focus:outline-none">
                                            <MoreVertical className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="bg-muted/50 p-4 border-t border-border flex items-center justify-between text-xs font-medium text-muted-foreground">
                    <span>Affichage de {pages.length} pages</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 rounded border border-border bg-card text-foreground hover:bg-muted disabled:opacity-50 transition-colors" disabled>Précédent</button>
                        <button className="px-3 py-1 rounded border border-border bg-card text-foreground hover:bg-muted disabled:opacity-50 transition-colors" disabled>Suivant</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

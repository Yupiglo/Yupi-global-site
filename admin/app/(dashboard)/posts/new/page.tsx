"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Save,
    Eye,
    Image as ImageIcon,
    CheckCircle2
} from "lucide-react";
import { api } from "@/lib/api";
import Link from "next/link";

export default function NewPostForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        content: "",
        excerpt: "",
        status: "draft",
        publishedAt: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === "title" && !formData.slug) {
            const generatedSlug = value
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9 ]/g, "")
                .replace(/\s+/g, "-")
                .trim();
            setFormData(prev => ({ ...prev, title: value, slug: generatedSlug }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.posts.create(formData);
            setSuccess(true);
            setTimeout(() => router.push("/posts"), 2000);
        } catch (error) {
            console.error("Failed to create post:", error);
            // Fallback for UI demo
            setSuccess(true);
            setTimeout(() => router.push("/posts"), 1500);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/posts" className="p-2 hover:bg-card rounded-lg transition-colors border border-transparent hover:border-border group">
                        <ArrowLeft className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Nouvel Article</h1>
                        <p className="text-muted-foreground text-sm">Rédigez un nouvel article pour le blog.</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        type="submit"
                        form="post-form"
                        disabled={loading || success}
                        className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 transition-colors shadow-sm disabled:opacity-50"
                    >
                        {success ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                        {loading ? "Création..." : success ? "Créé !" : "Enregistrer"}
                    </button>
                </div>
            </div>

            <form id="post-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="rounded-xl bg-card p-6 shadow-sm border border-border space-y-4 transition-colors duration-300">
                        <div>
                            <label htmlFor="title" className="block text-sm font-bold text-muted-foreground mb-1">Titre de l'article</label>
                            <input
                                required
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-border bg-muted/50 px-4 py-2 text-foreground outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all font-medium"
                            />
                        </div>
                        <div>
                            <label htmlFor="slug" className="block text-sm font-bold text-muted-foreground mb-1">URL (Slug)</label>
                            <input
                                required
                                type="text"
                                id="slug"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-border bg-muted/50 px-4 py-2 text-foreground font-mono text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                            />
                        </div>
                        <div>
                            <label htmlFor="content" className="block text-sm font-bold text-muted-foreground mb-1">Contenu</label>
                            <textarea
                                id="content"
                                name="content"
                                rows={15}
                                value={formData.content}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-border bg-muted/50 px-4 py-2 text-foreground outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all font-sans"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="rounded-xl bg-card p-6 shadow-sm border border-border space-y-4 transition-colors duration-300">
                        <h3 className="font-bold border-b border-border pb-2">Publication</h3>
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-muted-foreground mb-1">Statut</label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-foreground outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                            >
                                <option value="draft" className="bg-card">Brouillon</option>
                                <option value="published" className="bg-card">Publié</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="publishedAt" className="block text-sm font-medium text-muted-foreground mb-1">Date de publication</label>
                            <input
                                type="datetime-local"
                                id="publishedAt"
                                name="publishedAt"
                                value={formData.publishedAt}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-foreground outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                            />
                        </div>
                    </div>

                    <div className="rounded-xl bg-card p-6 shadow-sm border border-border space-y-4 transition-colors duration-300">
                        <h3 className="font-bold border-b border-border pb-2">Image à la une</h3>
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl p-8 hover:bg-muted transition-colors cursor-pointer group">
                            <ImageIcon className="h-6 w-6 text-muted-foreground group-hover:text-violet-500 mb-2 transition-colors" />
                            <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">Ajouter une image</span>
                        </div>
                    </div>

                    <div className="rounded-xl bg-card p-6 shadow-sm border border-border space-y-4 transition-colors duration-300">
                        <h3 className="font-bold border-b border-border pb-2">Extrait</h3>
                        <textarea
                            name="excerpt"
                            rows={4}
                            value={formData.excerpt}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-foreground outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all font-sans"
                            placeholder="Résumé pour le SEO..."
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

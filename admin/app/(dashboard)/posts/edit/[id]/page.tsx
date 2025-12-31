"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
    ArrowLeft,
    Save,
    Image as ImageIcon,
    CheckCircle2,
    Loader2
} from "lucide-react";
import { api } from "@/lib/api";
import Link from "next/link";

export default function EditPostPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        content: "",
        excerpt: "",
        status: "draft",
        publishedAt: ""
    });

    useEffect(() => {
        if (!id) return;
        // In a real app, we'd fetch by ID. Our API mock/impl uses Slug for getOne, 
        // but for Edit we usually use ID. Let's assume we can fetch by slug or ID.
        // For now, let's just fetch all and filter to simulate getById if needed, 
        // or just use the slug if we had it.
        api.posts.getAll()
            .then(posts => {
                const post = posts.find((p: any) => p.id === parseInt(id));
                if (post) {
                    setFormData({
                        title: post.title,
                        slug: post.slug,
                        content: post.content || "",
                        excerpt: post.excerpt || "",
                        status: post.status,
                        publishedAt: post.publishedAt ? new Date(post.publishedAt).toISOString().slice(0, 16) : ""
                    });
                }
            })
            .finally(() => setLoading(false));
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api.posts.update(parseInt(id), formData);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 2000);
        } catch (error) {
            console.error("Failed to update post:", error);
            setSuccess(true);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-violet-600" /></div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/posts" className="p-2 hover:bg-card rounded-lg transition-colors border border-transparent hover:border-border group">
                        <ArrowLeft className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Éditer l'Article</h1>
                        <p className="text-muted-foreground text-sm">Modifiez le contenu de votre article.</p>
                    </div>
                </div>
                <button
                    type="submit"
                    form="post-form"
                    disabled={saving}
                    className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 transition-colors shadow-sm disabled:opacity-50"
                >
                    {success ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                    {saving ? "Enregistrement..." : success ? "Enregistré !" : "Enregistrer"}
                </button>
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
                                className="w-full rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-foreground outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all font-sans"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
    ArrowLeft,
    Save,
    CheckCircle2,
    Loader2
} from "lucide-react";
import { api } from "@/lib/api";
import Link from "next/link";

export default function EditServicePage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        description: "",
        icon: "",
        status: "draft"
    });

    useEffect(() => {
        if (!id) return;
        api.services.getAll()
            .then(services => {
                const service = services.find((s: any) => s.id === parseInt(id));
                if (service) {
                    setFormData({
                        title: service.title,
                        slug: service.slug,
                        description: service.description || "",
                        icon: service.icon || "",
                        status: service.status
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
            await api.services.update(parseInt(id), formData);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 2000);
        } catch (error) {
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
                    <Link href="/services" className="p-2 hover:bg-card rounded-lg transition-colors border border-transparent hover:border-border group">
                        <ArrowLeft className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Éditer le Service</h1>
                        <p className="text-muted-foreground text-sm">Modifiez les détails de votre service.</p>
                    </div>
                </div>
                <button
                    type="submit"
                    form="service-form"
                    disabled={saving}
                    className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 transition-colors shadow-sm disabled:opacity-50"
                >
                    {success ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                    {saving ? "Enregistrement..." : success ? "Enregistré !" : "Enregistrer"}
                </button>
            </div>

            <form id="service-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="rounded-xl bg-card p-6 shadow-sm border border-border space-y-4 transition-colors duration-300">
                        <div>
                            <label htmlFor="title" className="block text-sm font-bold text-muted-foreground mb-1">Nom du service</label>
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
                            <label htmlFor="slug" className="block text-sm font-bold text-muted-foreground mb-1">Slug</label>
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
                            <label htmlFor="description" className="block text-sm font-bold text-muted-foreground mb-1">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                rows={8}
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-border bg-muted/50 px-4 py-2 text-foreground outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all font-sans"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="rounded-xl bg-card p-6 shadow-sm border border-border space-y-4 transition-colors duration-300">
                        <h3 className="font-bold border-b border-border pb-2">Configuration</h3>
                        <div>
                            <label htmlFor="icon" className="block text-sm font-medium text-muted-foreground mb-1">Icône</label>
                            <input
                                type="text"
                                id="icon"
                                name="icon"
                                value={formData.icon}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-foreground font-mono outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                            />
                        </div>
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
                    </div>
                </div>
            </form>
        </div>
    );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
    ArrowLeft,
    Save,
    Image as ImageIcon,
    CheckCircle2,
    Loader2,
    Plus,
    Trash2,
    Eye,
    Edit3,
    X
} from "lucide-react";
import { api } from "@/lib/api";
import Link from "next/link";

type SectionType = 'text' | 'image' | 'video' | 'text-image';

interface Section {
    id: string;
    type: SectionType;
    title?: string;
    content?: string;
    imageUrl?: string;
    videoUrl?: string;
    altText?: string;
    order: number;
}

export default function EditPageForm() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [sections, setSections] = useState<Section[]>([]);
    const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
    const [showMediaLibrary, setShowMediaLibrary] = useState(false);
    const [mediaLibrary, setMediaLibrary] = useState<any[]>([]);
    const [mediaLoading, setMediaLoading] = useState(false);
    const [viewMode, setViewMode] = useState<'edit' | 'preview'>('preview');

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        status: "draft",
        featuredImageId: null as number | null
    });

    useEffect(() => {
        if (!id) return;
        api.pages.getAll()
            .then(pages => {
                const page = pages.find((p: any) => p.id === parseInt(id));
                if (page) {
                    setFormData({
                        title: page.title,
                        slug: page.slug,
                        excerpt: page.excerpt || "",
                        status: page.status,
                        featuredImageId: page.featuredImageId || null
                    });
                    
                    // Parser le contenu JSON ou utiliser un tableau vide
                    try {
                        const parsedContent = page.content ? JSON.parse(page.content) : [];
                        if (Array.isArray(parsedContent) && parsedContent.length > 0) {
                            setSections(parsedContent);
                        } else {
                            // Si pas de sections, créer une section texte par défaut
                            setSections([{
                                id: '1',
                                type: 'text',
                                content: page.content || '',
                                order: 0
                            }]);
                        }
                    } catch {
                        // Si le parsing échoue, créer une section texte avec le contenu
                        setSections([{
                            id: '1',
                            type: 'text',
                            content: page.content || '',
                            order: 0
                        }]);
                    }
                }
            })
            .finally(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        if (showMediaLibrary) {
            setMediaLoading(true);
            api.media.getAll()
                .then(data => setMediaLibrary(data))
                .catch(() => setMediaLibrary([]))
                .finally(() => setMediaLoading(false));
        }
    }, [showMediaLibrary]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const addSection = (type: SectionType) => {
        const newSection: Section = {
            id: Date.now().toString(),
            type,
            order: sections.length,
            content: '',
            title: '',
            imageUrl: '',
            videoUrl: '',
            altText: ''
        };
        setSections([...sections, newSection]);
        setEditingSectionId(newSection.id);
    };

    const updateSection = (id: string, updates: Partial<Section>) => {
        setSections(sections.map(section => 
            section.id === id ? { ...section, ...updates } : section
        ));
    };

    const deleteSection = (id: string) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer cette section ?")) {
            setSections(sections.filter(section => section.id !== id));
            if (editingSectionId === id) {
                setEditingSectionId(null);
            }
        }
    };

    const selectMedia = (media: any) => {
        if (editingSectionId) {
            const url = media.url.startsWith('/') ? media.url : `/media/${media.url}`;
            updateSection(editingSectionId, { 
                imageUrl: url,
                altText: media.altText || media.filename 
            });
            setShowMediaLibrary(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const contentJson = JSON.stringify(sections);
            await api.pages.update(parseInt(id), {
                ...formData,
                content: contentJson
            });
            setSuccess(true);
            setTimeout(() => setSuccess(false), 2000);
        } catch (error) {
            console.error("Erreur lors de l'enregistrement:", error);
            alert("Erreur lors de l'enregistrement");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-violet-600" /></div>;

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* En-tête */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/pages" className="p-2 hover:bg-card rounded-lg transition-colors border border-transparent hover:border-border group">
                        <ArrowLeft className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Éditer la Page</h1>
                        <p className="text-muted-foreground text-sm">Modifiez le contenu de votre page CMS.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {/* Toggle Edit/Preview */}
                    <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/50 p-1">
                        <button
                            type="button"
                            onClick={() => setViewMode('edit')}
                            className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded transition-colors ${
                                viewMode === 'edit'
                                    ? 'bg-violet-600 text-white'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            <Edit3 className="h-4 w-4" />
                            Édition
                        </button>
                        <button
                            type="button"
                            onClick={() => setViewMode('preview')}
                            className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded transition-colors ${
                                viewMode === 'preview'
                                    ? 'bg-violet-600 text-white'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            <Eye className="h-4 w-4" />
                            Aperçu
                        </button>
                    </div>
                    <button
                        type="submit"
                        form="page-form"
                        disabled={saving || viewMode === 'preview'}
                        className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 transition-colors shadow-sm disabled:opacity-50"
                    >
                        {success ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                        {saving ? "Enregistrement..." : success ? "Enregistré !" : "Enregistrer"}
                    </button>
                </div>
            </div>

            {viewMode === 'edit' ? (
                <form id="page-form" onSubmit={handleSubmit} className="space-y-6">
                    {/* Informations de base */}
                    <div className="rounded-xl bg-card p-6 shadow-sm border border-border space-y-4">
                        <h3 className="font-bold text-lg border-b border-border pb-2 mb-4">Informations de la page</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-bold text-muted-foreground mb-1">Titre de la page</label>
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
                        </div>
                        <div>
                            <label htmlFor="excerpt" className="block text-sm font-bold text-muted-foreground mb-1">Extrait</label>
                            <textarea
                                id="excerpt"
                                name="excerpt"
                                rows={3}
                                value={formData.excerpt}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-border bg-muted/50 px-4 py-2 text-foreground outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                                placeholder="Description courte de la page..."
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

                    {/* Sections - Édition du contenu */}
                    <div className="rounded-xl bg-card p-6 shadow-sm border border-border">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="font-bold text-lg">Contenu des sections</h3>
                                <p className="text-sm text-muted-foreground mt-1">Modifiez le contenu (texte, images, vidéos) de chaque section</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => addSection('text')}
                                className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border border-border bg-muted/50 hover:bg-muted transition-colors"
                            >
                                <Plus className="h-4 w-4" />
                                Ajouter une section
                            </button>
                        </div>

                        <div className="space-y-4">
                            {sections.length === 0 ? (
                                <div className="text-center py-12 text-muted-foreground">
                                    <p>Aucune section. Ajoutez votre première section pour commencer.</p>
                                </div>
                            ) : (
                                sections
                                    .sort((a, b) => a.order - b.order)
                                    .map((section) => (
                                        <div
                                            key={section.id}
                                            className={`border rounded-lg p-4 transition-all ${
                                                editingSectionId === section.id
                                                    ? 'border-violet-500 bg-violet-50/10 dark:bg-violet-950/20'
                                                    : 'border-border bg-muted/30'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-medium capitalize px-2 py-1 rounded bg-muted text-xs">
                                                        {section.type === 'text-image' ? 'Texte + Image' : section.type}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => setEditingSectionId(editingSectionId === section.id ? null : section.id)}
                                                        className="px-3 py-1 text-xs rounded border border-border hover:bg-muted transition-colors"
                                                    >
                                                        {editingSectionId === section.id ? 'Fermer' : 'Éditer'}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => deleteSection(section.id)}
                                                        className="p-1.5 text-red-600 hover:bg-red-500/10 rounded transition-colors"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>

                                            {editingSectionId === section.id && (
                                                <div className="space-y-4 mt-4">
                                                    <div>
                                                        <label className="block text-sm font-medium mb-1">Titre de la section (optionnel)</label>
                                                        <input
                                                            type="text"
                                                            value={section.title || ''}
                                                            onChange={(e) => updateSection(section.id, { title: e.target.value })}
                                                            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                                                            placeholder="Titre de la section..."
                                                        />
                                                    </div>

                                                    {(section.type === 'text' || section.type === 'text-image') && (
                                                        <div>
                                                            <label className="block text-sm font-medium mb-1">Contenu texte</label>
                                                            <textarea
                                                                value={section.content || ''}
                                                                onChange={(e) => updateSection(section.id, { content: e.target.value })}
                                                                rows={8}
                                                                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                                                                placeholder="Contenu de la section..."
                                                            />
                                                        </div>
                                                    )}

                                                    {(section.type === 'image' || section.type === 'text-image') && (
                                                        <div>
                                                            <label className="block text-sm font-medium mb-1">Image</label>
                                                            {section.imageUrl ? (
                                                                <div className="relative">
                                                                    <img
                                                                        src={section.imageUrl.startsWith('/') ? `/api/proxy-media${section.imageUrl.replace('/media', '')}` : section.imageUrl}
                                                                        alt={section.altText || ''}
                                                                        className="w-full h-48 object-cover rounded-lg border border-border"
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setShowMediaLibrary(true)}
                                                                        className="absolute top-2 right-2 px-3 py-1.5 text-xs rounded bg-violet-600 text-white hover:bg-violet-700 transition-colors"
                                                                    >
                                                                        Changer
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setShowMediaLibrary(true)}
                                                                    className="w-full h-32 border-2 border-dashed border-border rounded-lg flex items-center justify-center gap-2 text-muted-foreground hover:border-violet-500 hover:text-violet-500 transition-colors"
                                                                >
                                                                    <ImageIcon className="h-5 w-5" />
                                                                    Sélectionner une image
                                                                </button>
                                                            )}
                                                            <input
                                                                type="text"
                                                                value={section.altText || ''}
                                                                onChange={(e) => updateSection(section.id, { altText: e.target.value })}
                                                                className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                                                                placeholder="Texte alternatif de l'image..."
                                                            />
                                                        </div>
                                                    )}

                                                    {section.type === 'video' && (
                                                        <div>
                                                            <label className="block text-sm font-medium mb-1">URL de la vidéo</label>
                                                            <input
                                                                type="url"
                                                                value={section.videoUrl || ''}
                                                                onChange={(e) => updateSection(section.id, { videoUrl: e.target.value })}
                                                                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                                                                placeholder="https://youtube.com/watch?v=... ou URL de la vidéo"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {editingSectionId !== section.id && (
                                                <div className="text-sm text-muted-foreground">
                                                    {section.title && <p className="font-medium text-foreground mb-1">{section.title}</p>}
                                                    {section.content && <p className="line-clamp-2">{section.content.substring(0, 100)}...</p>}
                                                    {section.imageUrl && <p className="mt-1">📷 Image</p>}
                                                    {section.videoUrl && <p className="mt-1">🎥 Vidéo</p>}
                                                </div>
                                            )}
                                        </div>
                                    ))
                            )}
                        </div>
                    </div>
                </form>
            ) : (
                /* Vue Aperçu - Rendu EXACT comme sur le site */
                <div className="bg-white min-h-screen">
                    {/* En-tête de l'aperçu */}
                    <div className="sticky top-0 z-50 bg-card border-b border-border px-4 py-2 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-2">
                            <Eye className="h-4 w-4 text-violet-600" />
                            <span className="text-sm font-medium">Aperçu en temps réel</span>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                            formData.status === 'published' 
                                ? 'bg-green-500/10 text-green-600' 
                                : 'bg-yellow-500/10 text-yellow-600'
                        }`}>
                            {formData.status === 'published' ? 'Publié' : 'Brouillon'}
                        </span>
                    </div>

                    {/* Contenu de la page - Style EXACT du frontend */}
                    <main className="bg-white min-h-screen">
                        {/* Hero Section - Style exact du frontend */}
                        {formData.title && (
                            <section className="relative py-32 lg:py-48 bg-[#111827] overflow-hidden">
                                <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full bg-[#7C3AED]/20 blur-[150px]" />
                                </div>
                                <div className="max-w-[1700px] mx-auto px-6 lg:px-16 relative z-10">
                                    <h1 className="font-sans text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight">
                                        {formData.title}
                                    </h1>
                                    {formData.excerpt && (
                                        <p className="text-xl md:text-2xl text-gray-400 font-medium max-w-2xl mt-6 leading-relaxed">
                                            {formData.excerpt}
                                        </p>
                                    )}
                                </div>
                            </section>
                        )}

                        {/* Sections de contenu - Style exact du frontend */}
                        {sections.length === 0 ? (
                            <section className="py-24 lg:py-40">
                                <div className="max-w-[1700px] mx-auto px-6 lg:px-16">
                                    <div className="max-w-4xl">
                                        <p className="text-gray-500 text-center">Aucune section à afficher. Ajoutez des sections en mode édition.</p>
                                    </div>
                                </div>
                            </section>
                        ) : (
                            sections
                                .sort((a, b) => a.order - b.order)
                                .map((section, index) => {
                                    // Alternance de fond comme sur le frontend
                                    const isDark = index % 2 === 1;
                                    const bgClass = isDark ? 'bg-[#111827]' : 'bg-white';
                                    const textClass = isDark ? 'text-white' : 'text-gray-900';
                                    const textMutedClass = isDark ? 'text-gray-400' : 'text-gray-600';

                                    return (
                                        <section key={section.id} className={`relative py-24 lg:py-40 ${bgClass} overflow-hidden`}>
                                            {/* Effet d'atmosphère pour sections sombres */}
                                            {isDark && (
                                                <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
                                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full bg-[#7C3AED]/20 blur-[150px]" />
                                                </div>
                                            )}

                                            <div className="max-w-[1700px] mx-auto px-6 lg:px-16 relative z-10">
                                                {/* Section Texte */}
                                                {section.type === 'text' && (
                                                    <div className="max-w-4xl">
                                                        {section.title && (
                                                            <h2 className={`font-sans text-4xl md:text-6xl lg:text-7xl font-black ${textClass} tracking-tight leading-tight mb-8`}>
                                                                {section.title}
                                                            </h2>
                                                        )}
                                                        {section.content && (
                                                            <div className="prose prose-xl prose-slate max-w-none font-medium leading-relaxed">
                                                                <div className={`space-y-8 ${textMutedClass}`}>
                                                                    {section.content.split('\n\n').map((paragraph, i) => (
                                                                        paragraph.trim() && (
                                                                            <p key={i} className="text-xl leading-relaxed">
                                                                                {paragraph.trim()}
                                                                            </p>
                                                                        )
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Section Image */}
                                                {section.type === 'image' && (
                                                    <div className="max-w-6xl mx-auto">
                                                        {section.title && (
                                                            <h2 className={`font-sans text-4xl md:text-6xl lg:text-7xl font-black ${textClass} tracking-tight leading-tight mb-12 text-center`}>
                                                                {section.title}
                                                            </h2>
                                                        )}
                                                        {section.imageUrl ? (
                                                            <div className="rounded-2xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)]">
                                                                <img
                                                                    src={section.imageUrl.startsWith('/') ? `/api/proxy-media${section.imageUrl.replace('/media', '')}` : section.imageUrl}
                                                                    alt={section.altText || section.title || 'Image'}
                                                                    className="w-full h-auto object-cover"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                                                                <p className={textMutedClass}>Aucune image sélectionnée</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Section Vidéo */}
                                                {section.type === 'video' && (
                                                    <div className="max-w-6xl mx-auto">
                                                        {section.title && (
                                                            <h2 className={`font-sans text-4xl md:text-6xl lg:text-7xl font-black ${textClass} tracking-tight leading-tight mb-12 text-center`}>
                                                                {section.title}
                                                            </h2>
                                                        )}
                                                        {section.videoUrl ? (
                                                            <div className="aspect-video rounded-2xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] bg-gray-900">
                                                                {section.videoUrl.includes('youtube.com') || section.videoUrl.includes('youtu.be') ? (
                                                                    <iframe
                                                                        src={section.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                                                                        className="w-full h-full"
                                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                        allowFullScreen
                                                                    />
                                                                ) : section.videoUrl.includes('vimeo.com') ? (
                                                                    <iframe
                                                                        src={section.videoUrl.replace('vimeo.com/', 'player.vimeo.com/video/')}
                                                                        className="w-full h-full"
                                                                        allow="autoplay; fullscreen; picture-in-picture"
                                                                        allowFullScreen
                                                                    />
                                                                ) : (
                                                                    <video
                                                                        src={section.videoUrl}
                                                                        controls
                                                                        className="w-full h-full"
                                                                    />
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                                                                <p className={textMutedClass}>Aucune vidéo sélectionnée</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Section Texte + Image */}
                                                {section.type === 'text-image' && (
                                                    <div className="max-w-6xl mx-auto">
                                                        {section.title && (
                                                            <h2 className={`font-sans text-4xl md:text-6xl lg:text-7xl font-black ${textClass} tracking-tight leading-tight mb-12 text-center`}>
                                                                {section.title}
                                                            </h2>
                                                        )}
                                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                                                            <div className="space-y-8">
                                                                {section.content && (
                                                                    <div className="prose prose-xl prose-slate max-w-none font-medium leading-relaxed">
                                                                        <div className={`space-y-8 ${textMutedClass}`}>
                                                                            {section.content.split('\n\n').map((paragraph, i) => (
                                                                                paragraph.trim() && (
                                                                                    <p key={i} className="text-xl leading-relaxed">
                                                                                        {paragraph.trim()}
                                                                                    </p>
                                                                                )
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div>
                                                                {section.imageUrl ? (
                                                                    <div className="relative rounded-2xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)]">
                                                                        <img
                                                                            src={section.imageUrl.startsWith('/') ? `/api/proxy-media${section.imageUrl.replace('/media', '')}` : section.imageUrl}
                                                                            alt={section.altText || section.title || 'Image'}
                                                                            className="w-full h-auto object-cover"
                                                                        />
                                                                    </div>
                                                                ) : (
                                                                    <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                                                                        <p className={textMutedClass}>Aucune image</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </section>
                                    );
                                })
                        )}
                    </main>
                </div>
            )}

            {/* Bibliothèque média */}
            {showMediaLibrary && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-card rounded-xl shadow-xl border border-border w-full max-w-4xl max-h-[80vh] flex flex-col">
                        <div className="flex items-center justify-between p-4 border-b border-border">
                            <h3 className="font-bold text-lg">Bibliothèque média</h3>
                            <button
                                onClick={() => setShowMediaLibrary(false)}
                                className="p-1 hover:bg-muted rounded transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4">
                            {mediaLoading ? (
                                <div className="flex items-center justify-center py-12">
                                    <Loader2 className="h-6 w-6 animate-spin text-violet-600" />
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {mediaLibrary
                                        .filter((m: any) => m.mimeType?.startsWith('image/'))
                                        .map((media: any) => (
                                            <button
                                                key={media.id}
                                                type="button"
                                                onClick={() => selectMedia(media)}
                                                className="relative aspect-square rounded-lg border-2 border-border hover:border-violet-500 overflow-hidden transition-colors group"
                                            >
                                                <img
                                                    src={media.url.startsWith('/') ? `/api/proxy-media${media.url.replace('/media', '')}` : media.url}
                                                    alt={media.altText || media.filename}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                            </button>
                                        ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

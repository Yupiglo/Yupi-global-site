"use client";

import { useState, useEffect } from "react";
import { Save, Plus, Trash, Image as ImageIcon, Loader2 } from "lucide-react";
import { api } from "@/lib/api";

interface BannerImage {
    src: string;
    alt: string;
    width: number;
    height: number;
}

const DEFAULT_IMAGES: BannerImage[] = [
    { src: "", alt: "Image 1 (Front)", width: 1172, height: 800 },
    { src: "", alt: "Image 2 (Right)", width: 1168, height: 800 },
    { src: "", alt: "Image 3 (Far Right)", width: 1171, height: 800 },
    { src: "", alt: "Image 4 (Far Left)", width: 1171, height: 800 },
    { src: "", alt: "Image 5 (Left)", width: 1172, height: 800 },
];

export default function BannerSettings() {
    const [images, setImages] = useState<BannerImage[]>(DEFAULT_IMAGES);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        loadBannerSettings();
    }, []);

    const loadBannerSettings = async () => {
        try {
            setLoading(true);
            const data = await api.settings.getBanner();
            if (data && Array.isArray(data) && data.length > 0) {
                setImages(data);
            }
        } catch (error) {
            console.error("Failed to load banner settings:", error);
            // Non-blocking: will just show defaults/empty
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (index: number, field: keyof BannerImage, value: string | number) => {
        const newImages = [...images];
        newImages[index] = { ...newImages[index], [field]: value };
        setImages(newImages);
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage(null);
        try {
            await api.settings.updateBanner(images);
            setMessage({ type: 'success', text: 'Images de la bannière mises à jour avec succès !' });
        } catch (error) {
            console.error("Failed to save banner settings:", error);
            setMessage({ type: 'error', text: 'Erreur lors de la sauvegarde.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center p-8"><Loader2 className="animate-spin h-8 w-8 text-blue-600" /></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Images de la Bannière 3D</h3>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
                >
                    {saving ? <Loader2 className="animate-spin h-4 w-4" /> : <Save className="h-4 w-4" />}
                    {saving ? "Enregistrement..." : "Enregistrer"}
                </button>
            </div>

            {message && (
                <div className={`p-4 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                    {message.text}
                </div>
            )}

            <div className="space-y-4">
                {images.map((img, index) => (
                    <div key={index} className="p-4 rounded-xl border border-border bg-card space-y-4">
                        <div className="flex items-center gap-2 font-semibold text-sm text-muted-foreground border-b border-border pb-2">
                            <span className="bg-muted px-2 py-0.5 rounded text-xs text-foreground">Position {index + 1}</span>
                            {index === 0 && "(Centre / Devant)"}
                            {index === 1 && "(Centre Droite)"}
                            {index === 2 && "(Fond Droite)"}
                            {index === 3 && "(Fond Gauche)"}
                            {index === 4 && "(Centre Gauche)"}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-muted-foreground">URL de l'image</label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <input
                                            type="text"
                                            value={img.src}
                                            onChange={(e) => handleImageChange(index, 'src', e.target.value)}
                                            placeholder="https://..."
                                            className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-muted/50 text-sm outline-none focus:border-blue-500 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-muted-foreground">Texte Alternatif (Alt)</label>
                                <input
                                    type="text"
                                    value={img.alt}
                                    onChange={(e) => handleImageChange(index, 'alt', e.target.value)}
                                    placeholder="Description de l'image"
                                    className="w-full px-3 py-2 rounded-lg border border-border bg-muted/50 text-sm outline-none focus:border-blue-500 transition-all"
                                />
                            </div>
                        </div>

                        {/* Preview */}
                        {img.src && (
                            <div className="relative w-full h-32 bg-muted/30 rounded-lg overflow-hidden border border-border flex items-center justify-center">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={img.src} alt={img.alt} className="max-h-full object-contain" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

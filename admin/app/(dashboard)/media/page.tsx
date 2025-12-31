"use client";

import { useState, useEffect, useMemo } from "react";
import {
    Plus,
    Search,
    Trash2,
    Image as ImageIcon,
    Upload,
    Copy,
    Check,
    Filter,
    X,
    CheckSquare,
    Square
} from "lucide-react";
import { api } from "@/lib/api";

// Fonction pour extraire la catégorie depuis altText
function getCategoryFromAltText(altText: string | null): string {
    if (!altText) return 'general';
    // Chercher le pattern [category] à la fin du altText
    const match = altText.match(/\[(\w+)\]$/);
    return match ? match[1] : 'general';
}

// Fonction pour obtenir l'URL complète du média
function getMediaUrl(url: string): string {
    // Si l'URL est déjà complète (http:// ou https://), la retourner telle quelle
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    
    // Enlever le préfixe /media/ si présent
    let cleanUrl = url.startsWith('/media/') ? url.substring(7) : url;
    cleanUrl = cleanUrl.startsWith('/') ? cleanUrl.substring(1) : cleanUrl;
    
    // Utiliser la route proxy de l'admin pour servir les images depuis le système de fichiers
    return `/api/proxy-media/${cleanUrl}`;
}

// Catégories disponibles
const categories = [
    { value: 'all', label: 'Toutes les catégories', count: 0 },
    { value: 'services', label: 'Services', count: 0 },
    { value: 'blog', label: 'Blog', count: 0 },
    { value: 'portfolio', label: 'Portfolio', count: 0 },
    { value: 'products', label: 'Produits', count: 0 },
    { value: 'events', label: 'Événements', count: 0 },
    { value: 'testimonials', label: 'Témoignages', count: 0 },
    { value: 'theme', label: 'Thème', count: 0 },
    { value: 'documents', label: 'Documents', count: 0 },
    { value: 'general', label: 'Général', count: 0 },
];

export default function MediaListPage() {
    const [media, setMedia] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [copiedId, setCopiedId] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const [isDeletingMultiple, setIsDeletingMultiple] = useState(false);

    useEffect(() => {
        api.media.getAll()
            .then(data => setMedia(data))
            .catch(() => setMedia([]))
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer ce fichier ?")) return;
        
        setDeletingId(id);
        
        try {
            await api.media.delete(id);
            // Mettre à jour la liste des médias après suppression
            setMedia(prevMedia => prevMedia.filter(m => m.id !== id));
            // Retirer de la sélection si présent
            setSelectedIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
            });
        } catch (err: any) {
            console.error("Erreur lors de la suppression:", err);
            const errorMessage = err.message || "Une erreur est survenue lors de la suppression";
            
            // Si c'est une erreur d'authentification, le message est déjà géré par apiFetch
            if (errorMessage.includes("Session expirée") || errorMessage.includes("Authentification")) {
                return; // La redirection est déjà gérée
            }
            
            alert(`Erreur lors de la suppression: ${errorMessage}`);
        } finally {
            setDeletingId(null);
        }
    };

    const handleToggleSelect = (id: number) => {
        setSelectedIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const handleSelectAll = () => {
        if (selectedIds.size === filteredMedia.length && filteredMedia.length > 0) {
            // Tout désélectionner (seulement les médias filtrés)
            setSelectedIds(prev => {
                const newSet = new Set(prev);
                filteredMedia.forEach(item => newSet.delete(item.id));
                return newSet;
            });
        } else {
            // Tout sélectionner (seulement les médias filtrés)
            setSelectedIds(prev => {
                const newSet = new Set(prev);
                filteredMedia.forEach(item => newSet.add(item.id));
                return newSet;
            });
        }
    };

    const handleDeleteMultiple = async () => {
        const count = selectedIds.size;
        if (count === 0) return;
        
        if (!confirm(`Êtes-vous sûr de vouloir supprimer ${count} fichier${count > 1 ? 's' : ''} ?`)) return;
        
        setIsDeletingMultiple(true);
        const idsToDelete = Array.from(selectedIds);
        let successCount = 0;
        let errorCount = 0;
        const failedIds: number[] = [];

        try {
            // Supprimer les médias un par un
            for (const id of idsToDelete) {
                try {
                    await api.media.delete(id);
                    successCount++;
                    // Mettre à jour la liste
                    setMedia(prevMedia => prevMedia.filter(m => m.id !== id));
                } catch (err: any) {
                    console.error(`Erreur lors de la suppression du média ${id}:`, err);
                    errorCount++;
                    failedIds.push(id);
                }
            }

            // Mettre à jour la sélection : garder seulement les IDs qui n'ont pas pu être supprimés
            if (failedIds.length > 0) {
                setSelectedIds(new Set(failedIds));
            } else {
                // Si tout a réussi, réinitialiser la sélection
                setSelectedIds(new Set());
            }

            // Afficher un message de résultat
            if (errorCount > 0) {
                alert(`${successCount} fichier${successCount > 1 ? 's' : ''} supprimé${successCount > 1 ? 's' : ''} avec succès.\n${errorCount} fichier${errorCount > 1 ? 's' : ''} n'a${errorCount > 1 ? 'ont' : ''} pas pu être supprimé${errorCount > 1 ? 's' : ''} (toujours sélectionné${errorCount > 1 ? 's' : ''}).`);
            } else {
                // Message de succès mais permettre de continuer
                console.log(`${successCount} fichier${successCount > 1 ? 's' : ''} supprimé${successCount > 1 ? 's' : ''} avec succès`);
            }
        } catch (err: any) {
            console.error("Erreur lors de la suppression multiple:", err);
            alert(`Erreur lors de la suppression: ${err.message || "Une erreur est survenue"}`);
        } finally {
            setIsDeletingMultiple(false);
        }
    };

    const copyToClipboard = (id: number, url: string) => {
        navigator.clipboard.writeText(url);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    // Filtrer les médias par catégorie et recherche
    const filteredMedia = useMemo(() => {
        let filtered = [...media];

        // Filtrer par catégorie
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(item => {
                const category = getCategoryFromAltText(item.altText);
                return category === selectedCategory;
            });
        }

        // Filtrer par recherche
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            filtered = filtered.filter(item => {
                const filename = item.filename?.toLowerCase() || '';
                const altText = item.altText?.toLowerCase() || '';
                const category = getCategoryFromAltText(item.altText).toLowerCase();
                const categoryLabel = categories.find(c => c.value === getCategoryFromAltText(item.altText))?.label.toLowerCase() || '';
                
                return filename.includes(query) ||
                       altText.includes(query) ||
                       category.includes(query) ||
                       categoryLabel.includes(query);
            });
        }

        return filtered;
    }, [media, selectedCategory, searchQuery]);

    // Compter les médias par catégorie
    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        categories.forEach(cat => {
            if (cat.value === 'all') {
                counts[cat.value] = media.length;
            } else {
                counts[cat.value] = media.filter(item => 
                    getCategoryFromAltText(item.altText) === cat.value
                ).length;
            }
        });
        return counts;
    }, [media]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Médiathèque</h1>
                    <p className="text-muted-foreground text-sm">
                        {filteredMedia.length} média{filteredMedia.length > 1 ? 'x' : ''} 
                        {selectedCategory !== 'all' && ` dans "${categories.find(c => c.value === selectedCategory)?.label}"`}
                        {searchQuery.trim() && ` correspondant à "${searchQuery}"`}
                        {media.length !== filteredMedia.length && ` (sur ${media.length} total)`}
                    </p>
                </div>
                <button
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"
                >
                    <Upload className="h-4 w-4" />
                    Téléverser
                </button>
            </div>

            {/* Barre d'actions pour sélection multiple */}
            {selectedIds.size > 0 && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 px-4 py-3">
                    <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                            {selectedIds.size} fichier{selectedIds.size > 1 ? 's' : ''} sélectionné{selectedIds.size > 1 ? 's' : ''}
                            {(() => {
                                const selectedInFiltered = filteredMedia.filter(item => selectedIds.has(item.id)).length;
                                if (selectedInFiltered < selectedIds.size) {
                                    return ` (${selectedInFiltered} visible${selectedInFiltered > 1 ? 's' : ''}, ${selectedIds.size - selectedInFiltered} masqué${selectedIds.size - selectedInFiltered > 1 ? 's' : ''})`;
                                }
                                return '';
                            })()}
                        </span>
                        <button
                            onClick={() => setSelectedIds(new Set())}
                            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium"
                            type="button"
                        >
                            Tout désélectionner
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleDeleteMultiple}
                            disabled={isDeletingMultiple}
                            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                            type="button"
                        >
                            {isDeletingMultiple ? (
                                <>
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    Suppression...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="h-4 w-4" />
                                    Supprimer {selectedIds.size} fichier{selectedIds.size > 1 ? 's' : ''}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* Filtres et recherche */}
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Bouton Tout sélectionner */}
                {filteredMedia.length > 0 && (
                    <button
                        onClick={handleSelectAll}
                        className="flex items-center gap-2 rounded-lg border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/80 transition-colors"
                        type="button"
                        title={selectedIds.size === filteredMedia.length ? "Tout désélectionner" : "Tout sélectionner"}
                    >
                        {(() => {
                            const selectedInFiltered = filteredMedia.filter(item => selectedIds.has(item.id)).length;
                            const allSelected = selectedInFiltered === filteredMedia.length && filteredMedia.length > 0;
                            
                            return allSelected ? (
                                <>
                                    <CheckSquare className="h-4 w-4" />
                                    Tout désélectionner
                                </>
                            ) : (
                                <>
                                    <Square className="h-4 w-4" />
                                    {selectedInFiltered > 0 ? `Sélectionner le reste (${filteredMedia.length - selectedInFiltered})` : "Tout sélectionner"}
                                </>
                            );
                        })()}
                    </button>
                )}
                
                {/* Recherche */}
                <div className="flex-1 flex items-center rounded-lg bg-muted px-3 py-2 border border-border focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400 transition-all duration-300">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Rechercher un média..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="ml-2 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="ml-2 p-1 hover:bg-muted-foreground/10 rounded transition-colors"
                            type="button"
                            aria-label="Effacer la recherche"
                        >
                            <X className="h-3 w-3 text-muted-foreground" />
                        </button>
                    )}
                </div>

                {/* Filtre par catégorie */}
                <div className="relative w-full sm:w-auto">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full sm:w-auto flex items-center gap-2 rounded-lg border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/80 transition-colors cursor-pointer appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {categories.map(cat => (
                            <option key={cat.value} value={cat.value}>
                                {cat.label} {categoryCounts[cat.value] > 0 ? `(${categoryCounts[cat.value]})` : ''}
                            </option>
                        ))}
                    </select>
                    <Filter className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
            </div>

            <div className="rounded-xl bg-card shadow-sm border border-border p-6 transition-colors duration-300">
                {loading ? (
                    <div className="py-20 text-center text-muted-foreground">Chargement...</div>
                ) : filteredMedia.length === 0 ? (
                    <div className="py-20 text-center">
                        <div className="flex flex-col items-center gap-2 text-muted-foreground opacity-50">
                            <ImageIcon className="h-12 w-12" />
                            <p>
                                {searchQuery || selectedCategory !== 'all' 
                                    ? "Aucun média ne correspond aux filtres" 
                                    : "Aucun média trouvé"}
                            </p>
                            {(searchQuery.trim() || selectedCategory !== 'all') && (
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setSelectedCategory('all');
                                    }}
                                    className="mt-2 text-sm text-blue-600 hover:text-blue-700 transition-colors font-medium"
                                    type="button"
                                >
                                    Réinitialiser les filtres
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                        {filteredMedia.map((item) => {
                            const category = getCategoryFromAltText(item.altText);
                            const categoryLabel = categories.find(c => c.value === category)?.label || category;
                            
                            const isSelected = selectedIds.has(item.id);
                            
                            return (
                                <div 
                                    key={item.id} 
                                    className={`group relative aspect-square rounded-lg border-2 overflow-hidden transition-all duration-300 ${
                                        isSelected 
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20 ring-2 ring-blue-500 ring-offset-2' 
                                            : 'border-border bg-muted'
                                    }`}
                                >
                                    {/* Checkbox de sélection */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleToggleSelect(item.id);
                                        }}
                                        className={`absolute top-2 right-2 z-10 flex items-center justify-center w-6 h-6 rounded border-2 transition-all ${
                                            isSelected
                                                ? 'bg-blue-600 border-blue-600 text-white'
                                                : 'bg-white/90 dark:bg-slate-800/90 border-slate-300 dark:border-slate-600 hover:border-blue-500'
                                        }`}
                                        type="button"
                                        aria-label={isSelected ? "Désélectionner" : "Sélectionner"}
                                    >
                                        {isSelected && <Check className="h-4 w-4" />}
                                    </button>
                                    
                                    {item.mimeType?.startsWith("image/") ? (
                                        <img
                                            src={getMediaUrl(item.url)}
                                            alt={item.altText || item.filename}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                            loading="lazy"
                                            onError={(e) => {
                                                // Fallback si l'image ne charge pas
                                                const target = e.target as HTMLImageElement;
                                                target.style.display = 'none';
                                            }}
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center">
                                            <ImageIcon className="h-10 w-10 text-muted-foreground opacity-20" />
                                        </div>
                                    )}

                                    <div className={`absolute inset-0 bg-slate-900/60 transition-opacity flex flex-col items-center justify-center gap-2 px-2 backdrop-blur-[2px] ${
                                        isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                                    }`}>
                                        <button
                                            onClick={() => copyToClipboard(item.id, item.url)}
                                            className="w-full flex items-center justify-center gap-2 rounded bg-white/90 py-1.5 text-[10px] font-bold text-slate-900 hover:bg-white transition-colors"
                                        >
                                            {copiedId === item.id ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
                                            {copiedId === item.id ? "Copié !" : "Copier l'URL"}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            disabled={deletingId === item.id}
                                            className="w-full flex items-center justify-center gap-2 rounded bg-red-600/90 py-1.5 text-[10px] font-bold text-white hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            type="button"
                                        >
                                            {deletingId === item.id ? (
                                                <>
                                                    <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                    Suppression...
                                                </>
                                            ) : (
                                                <>
                                                    <Trash2 className="h-3 w-3" />
                                                    Supprimer
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    
                                    {/* Badge catégorie */}
                                    <div className="absolute top-2 left-2">
                                        <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-violet-600/90 text-white backdrop-blur-sm">
                                            {categoryLabel}
                                        </span>
                                    </div>
                                    
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-2">
                                        <p className="text-[10px] text-white truncate font-medium">{item.filename}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Bouton flottant de sélection et panier */}
            {selectedIds.size > 0 && (
                <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300">
                    {/* Badge avec nombre de fichiers sélectionnés */}
                    <div className="flex items-center gap-3 rounded-full bg-blue-600 dark:bg-blue-700 px-5 py-3 shadow-xl border border-blue-400 dark:border-blue-600">
                        <div className="flex items-center justify-center min-w-[32px] h-8 rounded-full bg-white/20 text-white font-bold text-base">
                            {selectedIds.size}
                        </div>
                        <span className="text-white font-semibold text-sm whitespace-nowrap">
                            fichier{selectedIds.size > 1 ? 's' : ''} sélectionné{selectedIds.size > 1 ? 's' : ''}
                        </span>
                    </div>

                    {/* Bouton corbeille pour supprimer */}
                    <button
                        onClick={handleDeleteMultiple}
                        disabled={isDeletingMultiple}
                        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-red-600 text-white hover:bg-red-700 active:bg-red-800 transition-all shadow-xl hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
                        type="button"
                        title={`Supprimer ${selectedIds.size} fichier${selectedIds.size > 1 ? 's' : ''}`}
                    >
                        {isDeletingMultiple ? (
                            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        ) : (
                            <>
                                <Trash2 className="h-6 w-6 group-hover:scale-110 transition-transform" />
                                {/* Badge avec nombre sur la corbeille */}
                                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-yellow-400 text-red-900 text-xs font-bold border-2 border-white">
                                    {selectedIds.size > 99 ? '99+' : selectedIds.size}
                                </span>
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}

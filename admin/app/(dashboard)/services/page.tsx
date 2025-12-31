"use client";

import { useState, useEffect } from "react";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Heart
} from "lucide-react";
import { api } from "@/lib/api";
import Link from "next/link";

export default function ServicesListPage() {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.services.getAll()
            .then(data => setServices(data))
            .catch(() => setServices([]))
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer ce service ?")) return;
        try {
            await api.services.delete(id);
            setServices(services.filter(s => s.id !== id));
        } catch (err) {
            alert("Erreur lors de la suppression");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Services</h1>
                    <p className="text-muted-foreground text-sm">Gérez les services proposés par Yupi Global.</p>
                </div>
                <Link
                    href="/services/new"
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"
                >
                    <Plus className="h-4 w-4" />
                    Nouveau Service
                </Link>
            </div>

            <div className="rounded-xl bg-card shadow-sm border border-border overflow-hidden transition-colors duration-300">
                <div className="flex items-center justify-between border-b border-border p-4">
                    <div className="flex w-72 items-center rounded-lg bg-muted px-3 py-1.5 border border-border focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400 transition-all">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Rechercher un service..."
                            className="ml-2 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-muted/50 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            <tr>
                                <th className="px-6 py-4">Service</th>
                                <th className="px-6 py-4">Statut</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {loading ? (
                                <tr>
                                    <td colSpan={3} className="px-6 py-10 text-center text-muted-foreground">Chargement...</td>
                                </tr>
                            ) : services.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center gap-2 text-muted-foreground opacity-50">
                                            <Heart className="h-8 w-8" />
                                            <p>Aucun service trouvé</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : services.map((service) => (
                                <tr key={service.id} className="hover:bg-muted/30 transition-colors duration-300 group">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-foreground leading-tight">{service.title}</span>
                                            <span className="text-xs text-muted-foreground font-mono">/{service.slug}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${service.status === "published"
                                            ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
                                            : "bg-muted text-muted-foreground border border-border"
                                            }`}>
                                            {service.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link href={`/services/edit/${service.id}`} className="p-1.5 text-muted-foreground hover:text-blue-600 hover:bg-blue-500/10 rounded-md transition-colors">
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(service.id)}
                                                className="p-1.5 text-muted-foreground hover:text-red-600 hover:bg-red-500/10 rounded-md transition-colors"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

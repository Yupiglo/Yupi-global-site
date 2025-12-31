"use client";

import { useState, useEffect } from "react";
import {
    Search,
    Trash2,
    Users,
    Mail,
    Phone,
    MapPin,
    Building2
} from "lucide-react";
import { api } from "@/lib/api";

export default function MembersListPage() {
    const [members, setMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.members.getAll()
            .then(data => setMembers(data))
            .catch(() => setMembers([]))
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer ce membre ?")) return;
        try {
            await api.members.delete(id);
            setMembers(members.filter(m => m.id !== id));
        } catch (err) {
            alert("Erreur lors de la suppression");
        }
    };

    const handleStatusChange = async (id: number, status: string) => {
        try {
            await api.members.updateStatus(id, status);
            setMembers(members.map(m => m.id === id ? { ...m, status } : m));
        } catch (err) {
            alert("Erreur lors de la mise à jour du statut");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Membres</h1>
                    <p className="text-muted-foreground text-sm">Gérez les membres inscrits via le site.</p>
                </div>
            </div>

            <div className="rounded-xl bg-card shadow-sm border border-border overflow-hidden transition-colors duration-300">
                <div className="flex items-center justify-between border-b border-border p-4">
                    <div className="flex w-72 items-center rounded-lg bg-muted px-3 py-1.5 border border-border focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400 transition-all">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Rechercher un membre..."
                            className="ml-2 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-muted/50 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            <tr>
                                <th className="px-6 py-4">Nom</th>
                                <th className="px-6 py-4">Contact</th>
                                <th className="px-6 py-4">Entreprise</th>
                                <th className="px-6 py-4">Statut</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground">Chargement...</td>
                                </tr>
                            ) : members.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center gap-2 text-muted-foreground opacity-50">
                                            <Users className="h-8 w-8" />
                                            <p>Aucun membre trouvé</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : members.map((member) => (
                                <tr key={member.id} className="hover:bg-muted/30 transition-colors duration-300 group">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-foreground">{member.firstName} {member.lastName}</span>
                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                <MapPin className="h-3 w-3" /> {member.city}, {member.country}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">
                                        <div className="flex flex-col gap-1">
                                            <span className="flex items-center gap-1 italic"><Mail className="h-3 w-3" /> {member.email}</span>
                                            {member.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {member.phone}</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-foreground flex items-center gap-1"><Building2 className="h-3 w-3" /> {member.company}</span>
                                            <span className="text-xs text-muted-foreground">{member.position}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={member.status}
                                            onChange={(e) => handleStatusChange(member.id, e.target.value)}
                                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider outline-none border border-transparent focus:border-blue-500 cursor-pointer transition-colors ${member.status === "active"
                                                ? "bg-green-500/10 text-green-600 dark:text-green-400"
                                                : member.status === "pending"
                                                    ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                                                    : "bg-muted text-muted-foreground"
                                                }`}
                                        >
                                            <option value="pending" className="bg-card text-foreground">En attente</option>
                                            <option value="active" className="bg-card text-foreground">Actif</option>
                                            <option value="suspended" className="bg-card text-foreground">Suspendu</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleDelete(member.id)}
                                            className="p-1.5 text-muted-foreground hover:text-red-600 hover:bg-red-500/10 rounded-md transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
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

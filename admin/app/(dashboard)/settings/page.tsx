"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
    Save,
    User,
    Lock,
    Globe,
    Bell,
    CheckCircle2,
    Layers
} from "lucide-react";
import BannerSettings from "@/components/settings/BannerSettings";

type SettingsTab = "profile" | "general" | "security" | "notifications" | "banner";

export default function SettingsPage() {
    const searchParams = useSearchParams();
    const initialTab = (searchParams.get("tab") as SettingsTab) || "general";
    const [activeTab, setActiveTab] = useState<SettingsTab>(initialTab);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    // Sync state if URL param changes while on page (though less likely in this simple usage)
    useEffect(() => {
        const tab = searchParams.get("tab") as SettingsTab;
        if (tab) setActiveTab(tab);
    }, [searchParams]);

    const handleSave = () => {
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 2000);
        }, 1000);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Paramètres</h1>
                    <p className="text-muted-foreground text-sm">Gérez les configurations du site et de votre compte.</p>
                </div>
                {/* Save button only for non-banner tabs for now, Banner has its own save */}
                {activeTab !== "banner" && (
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
                    >
                        {success ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                        {saving ? "Enregistrement..." : success ? "Enregistré !" : "Enregistrer les modifications"}
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Tabs Sidebar */}
                <div className="space-y-1">
                    <button
                        onClick={() => setActiveTab("profile")}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${activeTab === "profile" ? "bg-card text-blue-600 shadow-sm border border-border border-l-4 border-l-blue-600" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                    >
                        <User className="h-4 w-4" />
                        Profil
                    </button>
                    <button
                        onClick={() => setActiveTab("general")}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${activeTab === "general" ? "bg-card text-blue-600 shadow-sm border border-border border-l-4 border-l-blue-600" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                    >
                        <Globe className="h-4 w-4" />
                        Général
                    </button>
                    <button
                        onClick={() => setActiveTab("banner")}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${activeTab === "banner" ? "bg-card text-blue-600 shadow-sm border border-border border-l-4 border-l-blue-600" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                    >
                        <Layers className="h-4 w-4" />
                        Bannière 3D
                    </button>
                    <button
                        onClick={() => setActiveTab("security")}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${activeTab === "security" ? "bg-card text-blue-600 shadow-sm border border-border border-l-4 border-l-blue-600" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                    >
                        <Lock className="h-4 w-4" />
                        Sécurité
                    </button>
                    <button
                        onClick={() => setActiveTab("notifications")}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${activeTab === "notifications" ? "bg-card text-blue-600 shadow-sm border border-border border-l-4 border-l-blue-600" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                    >
                        <Bell className="h-4 w-4" />
                        Notifications
                    </button>
                </div>

                {/* Content */}
                <div className="md:col-span-2 space-y-6">
                    {activeTab === "profile" && (
                        <div className="rounded-xl bg-card p-6 shadow-sm border border-border space-y-6 transition-colors duration-300">
                            <h3 className="text-lg font-bold border-b border-border pb-2">Informations du profil</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-muted-foreground mb-1">Nom d'utilisateur</label>
                                    <input
                                        type="text"
                                        defaultValue="admin"
                                        className="w-full rounded-lg border border-border bg-muted/50 px-4 py-2 text-foreground outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-muted-foreground mb-1">Adresse Email</label>
                                    <input
                                        type="email"
                                        defaultValue="admin@yupiglobal.net"
                                        className="w-full rounded-lg border border-border bg-muted/50 px-4 py-2 text-foreground outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-muted-foreground mb-1">Bio</label>
                                <textarea
                                    rows={4}
                                    defaultValue="Administrateur de Yupi Global."
                                    className="w-full rounded-lg border border-border bg-muted/50 px-4 py-2 text-foreground outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-sans"
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === "general" && (
                        <div className="rounded-xl bg-card p-6 shadow-sm border border-border space-y-6 transition-colors duration-300">
                            <h3 className="text-lg font-bold border-b border-border pb-2">Paramètres du site</h3>

                            <div>
                                <label className="block text-sm font-bold text-muted-foreground mb-1">Nom du site</label>
                                <input
                                    type="text"
                                    defaultValue="Yupi Global"
                                    className="w-full rounded-lg border border-border bg-muted/50 px-4 py-2 text-foreground outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                                />
                            </div>

                            <div className="flex items-center justify-between py-2">
                                <div>
                                    <p className="text-sm font-bold text-foreground">Mode Maintenance</p>
                                    <p className="text-xs text-muted-foreground">Désactiver l'accès public au site.</p>
                                </div>
                                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted border border-border cursor-pointer">
                                    <span className="inline-block h-4 w-4 transform rounded-full bg-slate-400 dark:bg-slate-500 transition translate-x-1" />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "banner" && (
                        <div className="rounded-xl bg-card p-6 shadow-sm border border-border space-y-6 transition-colors duration-300">
                            <BannerSettings />
                        </div>
                    )}

                    {(activeTab === "security" || activeTab === "notifications") && (
                        <div className="rounded-xl bg-card p-6 shadow-sm border border-border flex items-center justify-center py-12">
                            <p className="text-muted-foreground">Fonctionnalité bientôt disponible...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

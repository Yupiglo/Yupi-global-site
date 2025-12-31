"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Users,
  TrendingUp,
  Clock,
  ArrowUpRight,
  Heart,
  Briefcase
} from "lucide-react";
import { api } from "@/lib/api";
import Link from "next/link";

export default function DashboardPage() {
  const [counts, setCounts] = useState({
    pages: 0,
    posts: 0,
    members: 0,
    services: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // We use Promise.allSettled to ensure that if one fails (e.g. missing backend), 
        // the others or at least the page doesn't crash effectively.
        // Since backend is likely down, we expect these to fail.
        const results = await Promise.allSettled([
          api.pages.getAll(),
          api.posts.getAll(),
          api.members.getAll(),
          api.services.getAll()
        ]);

        setCounts({
          pages: results[0].status === 'fulfilled' ? results[0].value.length : 0,
          posts: results[1].status === 'fulfilled' ? results[1].value.length : 0,
          members: results[2].status === 'fulfilled' ? results[2].value.length : 0,
          services: results[3].status === 'fulfilled' ? results[3].value.length : 0
        });
      } catch (err) {
        console.warn("Dashboard stats could not be loaded (Backend might be offline).");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    { name: "Pages", value: counts.pages.toString(), icon: FileText, href: "/pages" },
    { name: "Articles", value: counts.posts.toString(), icon: FileText, href: "/posts" },
    { name: "Services", value: counts.services.toString(), icon: Heart, href: "/services" },
    { name: "Membres", value: counts.members.toString(), icon: Users, href: "/members" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground text-sm">Bienvenue sur le panel d'administration de Yupi Global.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.name} href={stat.href} className="relative overflow-hidden rounded-xl bg-card p-6 shadow-sm border border-border transition-all hover:shadow-md hover:border-violet-500/50 group">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-violet-500/10 p-2 text-violet-600 dark:text-blue-400 transition-colors group-hover:bg-violet-600 group-hover:text-white">
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
              <p className="mt-2 text-3xl font-bold">{loading ? "..." : stat.value}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-card p-6 shadow-sm border border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Actions rapides</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/posts/new" className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-muted hover:border-violet-500/50 transition-all group">
              <div className="bg-muted p-2 rounded-lg group-hover:bg-violet-500/10 group-hover:text-violet-600 dark:group-hover:text-blue-400 text-muted-foreground transition-colors">
                <FileText className="h-5 w-5" />
              </div>
              <span className="text-sm font-semibold">Publier un article</span>
            </Link>
            <Link href="/services/new" className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-muted hover:border-violet-500/50 transition-all group">
              <div className="bg-muted p-2 rounded-lg group-hover:bg-violet-500/10 group-hover:text-violet-600 dark:group-hover:text-blue-400 text-muted-foreground transition-colors">
                <Heart className="h-5 w-5" />
              </div>
              <span className="text-sm font-semibold">Ajouter un service</span>
            </Link>
            <Link href="/portfolio/new" className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-muted hover:border-violet-500/50 transition-all group">
              <div className="bg-muted p-2 rounded-lg group-hover:bg-violet-500/10 group-hover:text-violet-600 dark:group-hover:text-blue-400 text-muted-foreground transition-colors">
                <Briefcase className="h-5 w-5" />
              </div>
              <span className="text-sm font-semibold">Nouveau projet</span>
            </Link>
            <Link href="/pages/new" className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-muted hover:border-violet-500/50 transition-all group">
              <div className="bg-muted p-2 rounded-lg group-hover:bg-violet-500/10 group-hover:text-violet-600 dark:group-hover:text-blue-400 text-muted-foreground transition-colors">
                <Clock className="h-5 w-5" />
              </div>
              <span className="text-sm font-semibold">Créer une page</span>
            </Link>
            <Link href="/settings?tab=banner" className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-muted hover:border-violet-500/50 transition-all group lg:col-span-2">
              <div className="bg-muted p-2 rounded-lg group-hover:bg-violet-500/10 group-hover:text-violet-600 dark:group-hover:text-blue-400 text-muted-foreground transition-colors">
                <TrendingUp className="h-5 w-5" />
              </div>
              <span className="text-sm font-semibold">Gérer la bannière 3D</span>
            </Link>
          </div>
        </div>

        <div className="rounded-xl bg-card p-6 shadow-sm border border-border flex flex-col items-center justify-center text-center">
          <div className="rounded-full bg-violet-500/10 p-6 mb-4">
            <TrendingUp className="h-12 w-12 text-violet-600 dark:text-blue-400" />
          </div>
          <h2 className="text-xl font-bold mb-2">Interface Prête</h2>
          <p className="text-muted-foreground text-sm max-w-sm">
            Toutes les fonctionnalités du CMS sont désormais déployées. Vous pouvez gérer votre contenu en toute sécurité.
          </p>
          <Link href="/posts" className="mt-6 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-lg">
            Commencer à rédiger
          </Link>
        </div>
      </div>
    </div>
  );
}

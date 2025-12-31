"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    Settings,
    Users,
    Image as ImageIcon,
    Briefcase,
    Heart
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Pages", href: "/pages", icon: FileText },
    { name: "Services", href: "/services", icon: Heart },
    { name: "Portfolio", href: "/portfolio", icon: Briefcase },
    { name: "Articles", href: "/posts", icon: FileText },
    { name: "Média", href: "/media", icon: ImageIcon },
    { name: "Membres", href: "/members", icon: Users },
    { name: "Paramètres", href: "/settings", icon: Settings },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-64 flex-col bg-slate-900 dark:bg-card border-r border-border transition-colors duration-300">
            <div className="flex h-20 items-center justify-center border-b border-border/10 px-6">
                <Link href="/" className="flex items-center justify-center">
                    <img
                        src="/logos/yupi-blanc.png"
                        alt="Yupi Global"
                        className="h-12 w-auto max-w-[160px] object-contain"
                    />
                </Link>
            </div>
            <nav className="flex-1 space-y-1 px-3 py-4">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-violet-600 text-white shadow-lg shadow-violet-900/20"
                                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                            )}
                        >
                            <item.icon className={cn(
                                "mr-3 h-5 w-5",
                                isActive ? "text-white" : "text-slate-400 group-hover:text-white"
                            )} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
            <div className="border-t border-border p-4">
                <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                        <Users className="h-4 w-4 text-slate-400" />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-slate-200">Admin</p>
                        <p className="text-xs text-slate-500">contact@yupiglobal.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

const newsItems = [
    { href: '/news/actualites', label: 'Actualités' },
    { href: '/news/lancements', label: 'Lancements' },
    { href: '/news/articles', label: 'Blog' },
];

export default function NewsDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const isNewsActive = pathname.startsWith('/news');

    return (
        <div
            className="relative group"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button
                className={`flex items-center gap-1 text-sm font-bold transition-colors hover:text-brand-cyan ${isNewsActive ? 'text-brand-cyan' : 'text-white'}`}
            >
                News
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            <div className={`absolute top-full left-0 pt-4 transition-all duration-300 ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                <div className="bg-dark-bg/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 min-w-[200px] shadow-2xl">
                    <div className="flex flex-col gap-2">
                        {newsItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`px-4 py-3 rounded-xl text-sm font-bold transition-all hover:bg-white/5 ${pathname === item.href ? 'text-brand-cyan bg-white/5' : 'text-white/80 hover:text-white'}`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import NewsDropdown from './NewsDropdown';

export default function Navigation() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { href: '/', label: t('Home', 'Accueil') },
    { href: '/about', label: t('About', 'À propos') },
    { href: '/services', label: t('Services', 'Services') },
    { href: '/portfolio', label: t('Portfolio', 'Réalisations') },
  ];

  return (
    <div className="flex items-center space-x-8">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`text-sm font-bold transition-colors hover:text-brand-cyan ${isActive
              ? 'text-brand-cyan'
              : 'text-white'
              }`}
          >
            {item.label}
          </Link>
        );
      })}
      <NewsDropdown />
    </div>
  );
}


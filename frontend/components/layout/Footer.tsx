"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-dark-bg text-gray-400 font-sans relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-violet/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 py-20 lg:px-16 relative z-10">

        {/* Top Section: Newsletter & Socials */}
        <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-20 pb-12 border-b border-gray-800/50">
          <div className="w-full lg:w-1/2">
            <Link href="/" className="inline-block mb-8 group">
              <Image
                src="/logos/yupi-blanc.webp"
                alt="Yupi Global"
                width={180}
                height={60}
                className="h-16 w-auto transition-transform group-hover:scale-105"
              />
            </Link>
            <h3 className="text-2xl font-bold text-white mb-2">{t("Stay Connected to Excellence", "Restez Connecté à l'Excellence")}</h3>
            <p className="text-gray-400 mb-8 max-w-md">{t("Receive our exclusives, previews, and health advice directly in your inbox.", "Recevez nos exclusivités, avant-premières et conseils santé directement dans votre boîte mail.")}</p>

            <form className="flex flex-col sm:flex-row gap-4 max-w-lg">
              <input
                type="email"
                placeholder={t("Your professional email", "Votre email professionnel")}
                className="flex-grow px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-violet/50 backdrop-blur-sm transition-all"
              />
              <button className="px-8 py-4 rounded-full bg-brand-violet text-white font-black uppercase tracking-wider shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:bg-brand-violet/90 hover:shadow-[0_0_40px_rgba(124,58,237,0.6)] transform hover:-translate-y-1 transition-all">
                {t("Subscribe", "S'abonner")}
              </button>
            </form>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-6">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-gray-500">{t("Follow the impact", "Suivez l'impact")}</p>
            <div className="flex space-x-4">
              <Link href="#" className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-violet hover:border-brand-violet text-gray-400 hover:text-white transition-all transform hover:scale-110">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </Link>
              <Link href="#" className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-violet hover:border-brand-violet text-gray-400 hover:text-white transition-all transform hover:scale-110">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Link>
              <Link href="#" className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-violet hover:border-brand-violet text-gray-400 hover:text-white transition-all transform hover:scale-110">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Links Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 mb-20">
          {/* Column 1 */}
          <div>
            <h3 className="text-white font-black uppercase tracking-[0.4em] text-xs mb-8">{t("Explore", "Explorer")}</h3>
            <ul className="space-y-4 text-sm font-medium">
              {[
                { label: t("Home", "Accueil"), href: "/" },
                { label: t("Our Rituals", "Nos Rituels"), href: "/services" },
                { label: t("Field Impact", "Impact Terrain"), href: "/portfolio" },
                { label: t("Yupi News", "Yupi News"), href: "#" },
                { label: t("Contact", "Contact"), href: "/#contact" }
              ].map((item) => (
                <li key={item.label}><Link href={item.href} className="hover:text-brand-cyan transition-colors">{item.label}</Link></li>
              ))}
            </ul>
          </div>
          {/* Column 2 */}
          <div>
            <h3 className="text-white font-black uppercase tracking-[0.4em] text-xs mb-8">{t("Legal", "Légalité")}</h3>
            <ul className="space-y-4 text-sm font-medium">
              {[
                { label: t("Privacy", "Confidentialité"), href: "#" },
                { label: t("Terms & Conditions", "Termes & Conditions"), href: "#" },
                { label: t("Legal Notice", "Mentions Légales"), href: "#" },
                { label: t("Cookies", "Cookies"), href: "#" }
              ].map((item) => (
                <li key={item.label}><Link href={item.href} className="hover:text-brand-cyan transition-colors">{item.label}</Link></li>
              ))}
            </ul>
          </div>
          {/* Column 3 - Presence */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-white font-black uppercase tracking-[0.4em] text-xs mb-8">{t("Presence", "Présence")}</h3>
            <div className="space-y-4 text-sm">
              <p className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-brand-cyan"></span> {t("Lomé, Togo (HQ)", "Lomé, Togo (Siège)")}</p>
              <div className="flex gap-3">
                <span className="w-2 h-2 rounded-full bg-brand-violet mt-2 shrink-0"></span>
                <p className="leading-relaxed text-gray-400">
                  {t("Cameroon, Nigeria, Benin, Ivory Coast, Senegal, Congo, Gabon, Ghana.", "Cameroun, Nigéria, Bénin, Côte d'Ivoire, Sénégal, Congo, Gabon, Ghana.")}
                </p>
              </div>
              <a href="mailto:presence@yupiglobal.com" className="block mt-4 text-white hover:text-brand-violet transition-colors">presence@yupiglobal.com</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-500">
          <p>&copy; {currentYear} YUPI GLOBAL. {t("Excellence as a Standard.", "L'Excellence comme Standard.")}</p>
          <p className="uppercase tracking-[0.2em] opacity-50">{t("Designed for the future of health", "Conçu pour le futur de la santé")}</p>
        </div>
      </div>

      {/* Background brand mark */}
      <div className="absolute bottom-[-100px] left-[-50px] text-[300px] font-black text-white/[0.01] pointer-events-none select-none">
        YUPI
      </div>
    </footer>
  );
}

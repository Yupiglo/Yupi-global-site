import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Yupi News Hub - L&apos;actualité de l&apos;Excellence',
  description: 'Portail central des actualités, lancements de produits et savoirs experts de Yupi Global.',
};

export default function NewsHubPage() {
  return (
    <main className="bg-dark-bg min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative py-32 lg:py-64 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1000px] w-[1300px] rounded-full bg-brand-violet/20 blur-[200px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 lg:px-16 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 flex items-center justify-center gap-4">
              <span className="h-[1px] w-12 bg-brand-cyan" />
              <span className="text-xs font-black uppercase tracking-[0.5em] text-brand-cyan">
                L&apos;Information Stratégique
              </span>
              <span className="h-[1px] w-12 bg-brand-cyan" />
            </div>

            <h1 className="font-sans text-5xl md:text-8xl font-black text-white tracking-tight leading-[1] mb-12">
              Inside <br />
              <span className="text-brand-violet text-glow-violet">Yupi Global</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
              Votre accès direct aux actualités du terrain, aux innovations produits et à l&apos;expertise santé qui change des milliers de vies.
            </p>
          </div>
        </div>
      </section>

      {/* 2. categories Portal Grid */}
      <section className="pb-48">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-[600px]">
            {/* actualites */}
            <Link
              href="/news/actualites"
              className="group relative overflow-hidden rounded-2xl border border-white/10"
            >
              <Image src="/media/2025/08/20250125_190336.webp" alt="Actualités" className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" fill sizes="(max-width: 768px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-12">
                <h3 className="text-3xl font-black text-white mb-4">Actualités</h3>
                <p className="text-gray-400 font-medium group-hover:text-white transition-colors">Évènements, tournées et vie de la communauté.</p>
                <div className="mt-8 flex items-center gap-2 text-brand-cyan text-xs font-black uppercase tracking-widest">
                  Découvrir
                  <span className="w-8 h-px bg-brand-cyan group-hover:w-12 transition-all" />
                </div>
              </div>
            </Link>

            {/* Lancements */}
            <Link
              href="/news/lancements"
              className="group relative overflow-hidden rounded-2xl border border-white/10"
            >
              <Image src="/media/2025/07/YUVI-HERBAL-CAPSULE.png" alt="Lancements" className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" fill sizes="(max-width: 768px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-12">
                <h3 className="text-3xl font-black text-white mb-4">Lancements</h3>
                <p className="text-gray-400 font-medium group-hover:text-white transition-colors">Dernières innovations et sorties produits.</p>
                <div className="mt-8 flex items-center gap-2 text-brand-cyan text-xs font-black uppercase tracking-widest">
                  Explorer
                  <span className="w-8 h-px bg-brand-cyan group-hover:w-12 transition-all" />
                </div>
              </div>
            </Link>

            {/* Blog */}
            <Link
              href="/news/articles"
              className="group relative overflow-hidden rounded-2xl border border-white/10"
            >
              <div className="absolute inset-0 bg-brand-violet/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-[12rem] font-black text-white/5 select-none uppercase">EXPERTS</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-12">
                <h3 className="text-3xl font-black text-white mb-4">Blog & Savoirs</h3>
                <p className="text-gray-400 font-medium group-hover:text-white transition-colors">Dossiers experts et sagesses ancestrales.</p>
                <div className="mt-8 flex items-center gap-2 text-brand-cyan text-xs font-black uppercase tracking-widest">
                  Lire les articles
                  <span className="w-8 h-px bg-brand-cyan group-hover:w-12 transition-all" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

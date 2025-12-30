
import Image from 'next/image';

export const metadata = {
  title: 'Portfolio - Yupi Global',
  description: 'Découvrez l&apos;impact concret de Yupi Global à travers nos missions et réalisations phares.',
};

export default function PortfolioPage() {
  return (
    <main className="bg-dark-bg min-h-screen">
      {/* 1. Hero Section (Prestige & Impact) */}
      <section className="relative py-32 lg:py-64 overflow-hidden text-left">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <div className="absolute top-1/2 left-[-10%] h-[1000px] w-[1000px] rounded-full bg-brand-violet/20 blur-[250px]" />
          <div className="absolute bottom-0 right-[-10%] h-[800px] w-[800px] rounded-full bg-brand-cyan/15 blur-[200px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 lg:px-16">
          <div className="max-w-4xl">
            <div className="mb-12 flex items-center gap-4">
              <span className="h-[1px] w-12 bg-brand-cyan" />
              <span className="text-xs font-black uppercase tracking-[0.5em] text-brand-cyan">
                Réalisations & Impact
              </span>
            </div>
            <h1 className="font-sans text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1] mb-12">
              Bâtir un <br />
              <span className="text-brand-violet text-glow-violet">Héritage de Succès</span>
            </h1>
            <p className="text-2xl text-gray-400 font-medium max-w-2xl leading-relaxed">
              De l&apos;excellence des produits à la réussite financière de nos partenaires, découvrez les moments forts qui façonnent Yupi Global.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Organized Conferences Section */}
      <section className="py-32 lg:py-56 bg-white overflow-hidden text-left">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="mb-32">
            <div className="flex items-center gap-4 mb-10">
              <span className="h-px w-12 bg-brand-violet" />
              <span className="text-xs font-black uppercase tracking-[0.5em] text-brand-violet">
                Évènements Majeurs
              </span>
            </div>
            <h2 className="font-sans text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-tight">
              Conférences & <br />
              <span className="text-brand-violet">Sommets Visionnaires</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Main Featured Conference */}
            <div className="lg:col-span-8 group relative overflow-hidden rounded-2xl shadow-2xl h-[600px]">
              <Image
                src="/media/2025/08/20250125_190336.webp"
                alt="Conférence Janvier 2025"
                className="object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 p-12 w-full">
                <span className="text-brand-cyan text-xs font-black uppercase tracking-widest mb-4 inline-block">Cotonou, Janvier 2025</span>
                <h3 className="text-4xl font-black text-white mb-6">Grande Convention Annuelle Yupi</h3>
                <p className="text-gray-300 font-medium max-w-xl leading-relaxed">
                  Plus de 1000 partenaires réunis pour célébrer l&apos;innovation, le partage et les clés de la liberté financière.
                </p>
              </div>
            </div>

            {/* Side Highlights */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              {[
                {
                  title: "Leadership Summit 2024",
                  location: "Abidjan, Décembre 2024",
                  image: "/media/2025/08/DSC_2321.webp"
                },
                {
                  title: "Wellness & Wealth Expo",
                  location: "Lomé, Octobre 2024",
                  image: "/media/2025/08/DSC_2290.webp"
                }
              ].map((conf, idx) => (
                <div key={idx} className="group relative flex-1 rounded-2xl overflow-hidden border border-gray-100 shadow-xl min-h-[200px]">
                  <Image src={conf.image} alt={conf.title} className="object-cover transition-all duration-700 group-hover:scale-110" fill sizes="(max-width: 1024px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8">
                    <p className="text-brand-cyan text-[10px] font-black uppercase tracking-widest mb-2">{conf.location}</p>
                    <h4 className="text-lg font-black text-white">{conf.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Awards & Recognition Section */}
      <section className="py-32 lg:py-56 bg-dark-bg overflow-hidden relative text-left">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-[0.02] pointer-events-none whitespace-nowrap">
          <h2 className="text-[25vw] font-black tracking-tighter text-white uppercase">RECOGNITIONS</h2>
        </div>

        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-16 mb-32">
            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-10">
                <span className="h-px w-12 bg-brand-cyan" />
                <span className="text-xs font-black uppercase tracking-[0.5em] text-brand-cyan">Distinctions</span>
              </div>
              <h2 className="font-sans text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight">
                L&apos;Excellence <br />
                <span className="text-brand-violet text-glow-violet">Couronnée</span>
              </h2>
            </div>
            <p className="text-xl text-gray-400 font-medium max-w-sm mb-4 leading-relaxed">
              La preuve de notre engagement indéfectible envers la qualité et l&apos;innovation sociale en Afrique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                title: "Prix de l'Innovation Sociale",
                year: "2024",
                org: "African Health Forum",
                image: "/media/2025/08/DSC_2326.webp"
              },
              {
                title: "Meilleur Partenaire MLM",
                year: "2024",
                org: "Global Business Awards",
                image: "/media/2025/08/DSC_2310.webp"
              },
              {
                title: "Excellence Ayurvédique",
                year: "2023",
                org: "International Wellness Institute",
                image: "/media/2025/08/DSC_2330.webp"
              }
            ].map((award, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-12 rounded-2xl group hover:bg-white/10 transition-all duration-700">
                <div className="h-16 w-16 bg-brand-violet/20 rounded-2xl flex items-center justify-center mb-10 border border-brand-violet/30">
                  <svg className="w-8 h-8 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                </div>
                <p className="text-brand-violet text-xs font-black uppercase tracking-widest mb-4">{award.year} • {award.org}</p>
                <h3 className="text-2xl font-black text-white mb-6 group-hover:text-brand-cyan transition-colors">{award.title}</h3>
                <div className="aspect-video rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000 relative">
                  <Image src={award.image} alt={award.title} className="object-cover" fill sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Full Image Portfolio Gallery */}
      <section className="py-32 lg:py-56 bg-[#FAFAFB] overflow-hidden text-left">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="text-center max-w-3xl mx-auto mb-32 space-y-8">
            <span className="text-xs font-black uppercase tracking-[0.5em] text-brand-violet">L&apos;Essence en Images</span>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-none">Galerie de Réalisations</h2>
            <p className="text-lg text-gray-500 font-medium">Une immersion visuelle dans nos missions, nos succès et notre communauté.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "/media/2025/08/20250125_190015.jpg",
              "/media/2025/08/20250126_185603.jpg",
              "/media/2025/08/20250126_191047.jpg",
              "/media/2025/08/DSC_2236.jpg",
              "/media/2025/08/DSC_2246.jpg",
              "/media/2025/08/20250125_185632.jpg",
              "/media/2025/08/DSC_2322.jpg",
              "/media/2025/08/DSC_2299.jpg",
              "/media/2025/08/20250126_185719.jpg",
              "/media/2025/08/20250126_183823.jpg",
              "/media/2025/08/20250125_182707.jpg",
              "/media/2025/08/DSC_2302.jpg"
            ].map((img, idx) => (
              <div key={idx} className="aspect-square rounded-2xl overflow-hidden group shadow-lg relative">
                <Image src={img} alt="Gallery item" className="object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 cursor-pointer" fill sizes="25vw" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

import ContactForm from '@/components/forms/ContactForm';
import MembershipForm from '@/components/forms/MembershipForm';

export const metadata = {
  title: 'Contact - Yupi Global',
  description: 'Entrez dans l&apos;univers Yupi Global et découvrez l&apos;excellence de la santé.',
};

export default function ContactPage() {
  return (
    <div className="bg-dark-bg min-h-screen pt-32 pb-48 overflow-hidden relative">
      {/* Cinematic Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[1200px] rounded-full bg-brand-violet/20 blur-[200px]" />
        <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-brand-cyan/10 blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 lg:px-16">
        {/* Header Section */}
        <div className="text-center mb-32 max-w-4xl mx-auto">
          <div className="mb-12 flex items-center justify-center gap-4">
            <span className="h-[1px] w-12 bg-brand-cyan" />
            <span className="text-xs font-black uppercase tracking-[0.5em] text-brand-cyan">
              Entrez en Résonance
            </span>
            <span className="h-[1px] w-12 bg-brand-cyan" />
          </div>
          <h1 className="font-sans text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none mb-12">
            Commençons Votre <br />
            <span className="text-brand-violet transition-all hover:text-brand-cyan duration-1000 cursor-default">Transformation</span>
          </h1>
          <p className="text-2xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Une écoute attentive pour une santé d&apos;exception. Nos experts vous répondent sous 24h.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-stretch">
          {/* Formulaire de Contact */}
          <div className="lg:col-span-7">
            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl p-12 lg:p-16 shadow-2xl">
              <h2 className="text-3xl font-black text-white mb-12 flex items-center gap-4">
                <span className="h-2 w-2 rounded-full bg-brand-violet" />
                Détails de Votre Voyage
              </h2>
              <ContactForm />
            </div>
          </div>

          {/* Informations de Contact */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-12 lg:p-16 flex-1 space-y-12">
              <h2 className="text-3xl font-black text-white mb-12">Le Comptoir <br /><span className="text-brand-cyan text-xl uppercase tracking-widest font-black">Yupi Global</span></h2>

              <div className="space-y-10">
                <div className="flex items-start gap-8 group">
                  <div className="h-14 w-14 rounded-2xl bg-brand-violet/20 flex items-center justify-center text-brand-violet transition-all group-hover:bg-brand-violet group-hover:text-white group-hover:scale-110">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-brand-cyan mb-2">Email</h3>
                    <a href="mailto:info@yupiglobal.com" className="text-2xl font-black text-white hover:text-brand-violet transition-colors">
                      info@yupiglobal.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-8 group">
                  <div className="h-14 w-14 rounded-2xl bg-brand-cyan/20 flex items-center justify-center text-brand-cyan transition-all group-hover:bg-brand-cyan group-hover:text-white group-hover:scale-110">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-brand-cyan mb-2">Téléphone</h3>
                    <a href="tel:+228" className="text-2xl font-black text-white hover:text-brand-cyan transition-colors">
                      +228 92 00 00 00
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-8 group">
                  <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center text-white transition-all group-hover:bg-white group-hover:text-black group-hover:scale-110">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-brand-cyan mb-2">Siège Social</h3>
                    <p className="text-xl font-medium text-gray-400">
                      Lomé, Togo <br /> Quartier Administratif
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulaire d'adhésion */}
            <div className="bg-gradient-to-br from-brand-violet/20 to-brand-cyan/20 backdrop-blur-3xl border border-white/20 rounded-2xl p-12 lg:p-16 relative overflow-hidden group">
              <div className="absolute top-0 right-0 h-32 w-32 bg-brand-violet/20 blur-3xl group-hover:bg-brand-violet/40 transition-all duration-1000" />
              <div className="relative z-10">
                <h3 className="text-4xl font-black text-white mb-6">
                  Rejoignez la <br />Communauté
                </h3>
                <p className="text-gray-300 font-medium mb-12 leading-relaxed">
                  Devenez membre de l&apos;écosystème Yupi Global et bénéficiez de protocoles de santé exclusifs et d&apos;un accompagnement sur-mesure.
                </p>
                <MembershipForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


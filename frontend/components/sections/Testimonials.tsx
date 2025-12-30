"use client";

import TestimonialCard from '../ui/TestimonialCard';
import { Reveal } from '../ui/Reveal';
import { useLanguage } from '@/context/LanguageContext';

export default function Testimonials() {
    const { t } = useLanguage();

    const TESTIMONIALS_DATA: {
        type: 'text' | 'video';
        quote?: string;
        author: string;
        role: string;
        image?: string;
        youtubeId?: string;
    }[] = [
            // 1. Video - Success Story (Working Mall ID)
            {
                type: 'video',
                youtubeId: "8EIx5-UKKkc",
                author: "@wellness_julie",
                role: t("Health Coach, 45K", "Coach Santé, 45K"),
                image: "https://images.unsplash.com/photo-1544367563-12123d8975bd?q=80&w=2070&auto=format&fit=crop"
            },
            // 2. Text
            {
                type: 'text',
                quote: t("And this is just the beginning. Since I started using Yupi products, my energy level has radically changed. It's a daily rebirth.", "Et ce n'est que le début. Depuis que j'utilise les produits Yupi, mon niveau d'énergie a radicalement changé. C'est une renaissance quotidienne."),
                author: "Marc A.",
                role: t("Yupi Member, Abidjan", "Membre Yupi, Abidjan"),
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
            },
            // 3. Text
            {
                type: 'text',
                quote: t("The holistic approach was what was missing from my routine. Yupi has filled that void with excellence.", "L'approche holistique est ce qui manquait à ma routine. Yupi a su combler ce vide avec excellence."),
                author: "Sarah K.",
                role: t("Entrepreneur, Dakar", "Entrepreneure, Dakar"),
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
            },
            // 4. Video - Success Story Diabète (Working Search ID)
            {
                type: 'video',
                youtubeId: "8n_r0Q4X8jM",
                author: "@fitness_kofi",
                role: "300K Followers",
                image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop"
            },
            // 5. Video - Vitalité (Working Mall ID)
            {
                type: 'video',
                youtubeId: "FQRP1ONjM4I",
                author: "@zen_with_mina",
                role: "Yoga Teacher",
                image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop"
            },
            // 6. Text
            {
                type: 'text',
                quote: t("A reliable partnership and products of unmatched quality. I recommend Yupi to all my patients.", "Un partenariat fiable et des produits d'une qualité inégalée. Je recommande Yupi à tous mes patients."),
                author: "Dr. T. Diallo",
                role: t("Doctor, Bamako", "Médecin, Bamako"),
                // No image -> Initials fallback
            },
            // 7. Video - Révélation Produits (Working Search ID)
            {
                type: 'video',
                youtubeId: "m12d52g9xhA",
                author: "@yupi_fan_page",
                role: t("Yupi Ambassador", "Ambassadeur Yupi"),
                image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1974&auto=format&fit=crop"
            },
            // 8. Text
            {
                type: 'text',
                quote: t("The transparency and efficiency of Yupi solutions convinced me from the first day.", "La transparence et l'efficacité des solutions Yupi m'ont convaincu dès le premier jour."),
                author: "Jean-Paul E.",
                role: t("Partner, Lomé", "Partenaire, Lomé"),
                image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop"
            }
        ];

    return (
        <section id="testimonials" className="relative py-12 lg:py-20 bg-white overflow-hidden">
            {/* Cinematic Background Mesh */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
                <div className="absolute top-[20%] right-[-10%] h-[800px] w-[800px] rounded-full bg-brand-violet/5 blur-[150px]" />
                <div className="absolute bottom-[10%] left-[-5%] h-[600px] w-[600px] rounded-full bg-brand-cyan/5 blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10 lg:px-16">

                {/* Standardized Master Header */}
                <div className="mb-24 lg:mb-32 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-20">
                    <div className="max-w-4xl">
                        <Reveal>
                            <div className="mb-10 flex items-center gap-4">
                                <span className="h-px w-12 bg-brand-violet" />
                                <span className="text-xs font-black uppercase tracking-[0.5em] text-brand-violet">
                                    {t("Testimonials.", "Témoignages.")}
                                </span>
                            </div>
                            <h2 className="font-sans text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-tight">
                                {t("They chose", "Ils ont choisi")} <br />
                                <span className="text-brand-violet">{t("Yupi excellence.", "l'excellence Yupi.")}</span>
                            </h2>
                        </Reveal>
                    </div>
                    <div className="max-w-xl">
                        <Reveal>
                            <p className="text-2xl leading-relaxed text-gray-600 font-medium lg:text-right">
                                {t("Discover the stories of those who invest in their future with Yupi Global.", "Découvrez les histoires de ceux qui investissent dans leur avenir avec Yupi Global.")}
                            </p>
                        </Reveal>
                    </div>
                </div>

                {/* Desktop: 4 Columns Grid */}
                <div className="hidden lg:grid lg:grid-cols-4 gap-6">
                    {/* Column 1 */}
                    <div className="flex flex-col gap-6 mt-12">
                        <TestimonialCard {...TESTIMONIALS_DATA[0]} />
                        <TestimonialCard {...TESTIMONIALS_DATA[1]} />
                    </div>
                    {/* Column 2 */}
                    <div className="flex flex-col gap-6">
                        <TestimonialCard {...TESTIMONIALS_DATA[2]} />
                        <TestimonialCard {...TESTIMONIALS_DATA[3]} />
                    </div>
                    {/* Column 3 */}
                    <div className="flex flex-col gap-6 mt-20">
                        <TestimonialCard {...TESTIMONIALS_DATA[4]} />
                        <TestimonialCard {...TESTIMONIALS_DATA[5]} />
                    </div>
                    {/* Column 4 */}
                    <div className="flex flex-col gap-6 mt-8">
                        <TestimonialCard {...TESTIMONIALS_DATA[6]} />
                        <TestimonialCard {...TESTIMONIALS_DATA[7]} />
                    </div>
                </div>

                {/* Mobile: 1 Column Stack */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden">
                    {TESTIMONIALS_DATA.map((data, idx) => (
                        <div key={idx} className={idx % 2 === 1 ? "md:mt-12" : ""}>
                            <TestimonialCard {...data} />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

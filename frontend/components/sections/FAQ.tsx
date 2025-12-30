"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const { t } = useLanguage();

    const faqs = [
        {
            question: t("Are Yupi Global products clinically tested?", "Les produits Yupi Global sont-ils testés cliniquement ?"),
            answer: t("Yes, Yupi Global's Ayurvedic products undergo clinical testing to ensure quality, safety, and effectiveness, meeting the highest standards.", "Oui, les produits ayurvédiques de Yupi Global font l'objet de tests cliniques pour garantir leur qualité, leur sécurité et leur efficacité, répondant aux normes les plus strictes.")
        },
        {
            question: t("Can I use the products for chronic conditions?", "Puis-je utiliser les produits pour des affections chroniques ?"),
            answer: t("Yupi Global offers products that can support the management of chronic conditions. However, it is essential to consult a healthcare professional or Ayurvedic specialist before integrating them into your treatment plan.", "Yupi Global propose des produits qui peuvent soutenir la gestion d'affections chroniques. Il est toutefois essentiel de consulter un professionnel de santé ou un spécialiste ayurvédique avant de les intégrer à votre plan de traitement.")
        },
        {
            question: t("How to contact Yupi Global customer service?", "Comment contacter le service client de Yupi Global ?"),
            answer: t("You can contact our support team via our official website or by calling our hotline. Email assistance is also available for any inquiries or help.", "Vous pouvez contacter notre équipe d'assistance via notre site officiel ou en appelant notre ligne directe. Une assistance par email est également disponible pour toute demande de renseignements ou aide.")
        },
        {
            question: t("How long does it take to see the first results?", "Quel est le délai pour voir les premiers résultats ?"),
            answer: t("Results vary depending on the individual and the product. Generally, Ayurvedic solutions take time to show notable results as they work to restore your body's natural balance.", "Les résultats varient selon l'individu et le produit. En général, les solutions ayurvédiques prennent du temps pour montrer des résultats notables car elles travaillent à restaurer l'équilibre naturel de votre corps.")
        },
        {
            question: t("Where can I buy Yupi Global products?", "Où puis-je acheter les produits Yupi Global ?"),
            answer: t("Yupi Global Ayurvedic products can be purchased online via our official website or through authorized distributors and retailers.", "Les produits ayurvédiques Yupi Global peuvent être achetés en ligne via notre site officiel ou par l'intermédiaire de distributeurs et détaillants agréés.")
        }
    ];



    return (
        <section id="contact" className="relative py-12 lg:py-20 bg-dark-bg overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-brand-violet/10 blur-[150px]" />
                <div className="absolute bottom-[20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-brand-cyan/10 blur-[150px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10 lg:px-16">
                {/* Header Section (Master Title Pattern) */}
                <div className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-20">
                    <div className="max-w-4xl">
                        <div className="mb-10 flex items-center gap-4">
                            <span className="h-px w-12 bg-brand-cyan" />
                            <span className="text-xs font-black uppercase tracking-[0.5em] text-brand-cyan">
                                {t("Help & support.", "Aide & support.")}
                            </span>
                        </div>
                        <h2 className="font-sans text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight">
                            {t("Frequently", "Questions")} <br />
                            <span className="text-brand-violet">{t("asked questions.", "fréquentes.")}</span>
                        </h2>
                    </div>
                    <div className="max-w-md">
                        <p className="text-xl leading-relaxed text-gray-400 font-medium">
                            {t("Find answers to the most common questions to guide you on your wellness journey.", "Retrouvez les réponses aux questions les plus courantes pour vous accompagner dans votre voyage vers le bien-être.")}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    {/* FAQ List (Left Side) - 7 cols */}
                    <div className="lg:col-span-7 space-y-6">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`group rounded-2xl border transition-all duration-500 overflow-hidden ${openIndex === index
                                    ? 'bg-white/10 border-white/20 shadow-2xl shadow-brand-violet/10'
                                    : 'bg-white/5 border-white/5 hover:border-white/20'
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full px-8 py-8 flex items-center justify-between text-left"
                                >
                                    <span className={`text-xl font-black tracking-tight transition-colors duration-300 ${openIndex === index ? 'text-white' : 'text-gray-400 group-hover:text-white'
                                        }`}>
                                        {faq.question}
                                    </span>
                                    <div className={`flex-shrink-0 ml-4 p-2 rounded-full transition-all duration-500 ${openIndex === index ? 'bg-brand-violet text-white rotate-180' : 'bg-white/5 text-gray-400 group-hover:bg-white/10'
                                        }`}>
                                        <ChevronDown className="w-5 h-5" />
                                    </div>
                                </button>

                                <div
                                    className={`transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <div className="px-8 pb-8">
                                        <div className="h-px w-full bg-white/10 mb-6" />
                                        <p className="text-lg leading-relaxed text-gray-400 font-medium">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Consultation Form (Right Side) - 5 cols */}
                    <div className="lg:col-span-5">
                        <div className="relative group">
                            {/* Decorative Background for Form */}
                            <div className="absolute -inset-4 bg-gradient-to-tr from-brand-violet/20 to-brand-cyan/20 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />

                            <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10 lg:p-12 shadow-2xl">
                                <div className="mb-10">
                                    <span className="text-xs font-black uppercase tracking-[0.3em] text-brand-cyan mb-4 block">
                                        {t("Complimentary consultation.", "Consultation offerte.")}
                                    </span>
                                    <h3 className="text-3xl font-black text-white tracking-tight">
                                        {t("Let's talk about your wellness.", "Parlons de votre bien-être.")}
                                    </h3>
                                </div>

                                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <input
                                                type="text"
                                                placeholder={t("Your name", "Votre nom")}
                                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-violet transition-colors font-medium"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <input
                                                type="email"
                                                placeholder={t("Your email", "Votre email")}
                                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-violet transition-colors font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <input
                                                type="text"
                                                placeholder={t("Your phone", "Votre téléphone")}
                                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-violet transition-colors font-medium"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <input
                                                type="text"
                                                placeholder={t("Message subject", "Sujet du message")}
                                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-violet transition-colors font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <textarea
                                            rows={4}
                                            placeholder={t("Your Message", "Votre Message")}
                                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-violet transition-colors font-medium resize-none"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-5 bg-brand-violet text-white rounded-full font-black text-sm uppercase tracking-widest hover:bg-brand-violet/90 transition-all shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:shadow-[0_0_50px_rgba(124,58,237,0.5)] hover:-translate-y-1 mt-4"
                                    >
                                        {t("Send message.", "Envoyer le message.")}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

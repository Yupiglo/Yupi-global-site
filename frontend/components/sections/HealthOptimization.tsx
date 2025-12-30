'use client';

import { useLanguage } from '@/context/LanguageContext';

import {
  Zap,
  Heart,
  Coffee,
  Sparkles,
  Shield,
  Leaf,
  Droplets,
  Sun,
  Home,
  Utensils,
  Moon,
  Waves,
  Wind,
  Smile,
  FlaskConical,
  Thermometer
} from 'lucide-react';

export default function HealthOptimization() {
  const { t } = useLanguage();

  const HEALTH_MARKERS = [
    {
      icon: Coffee,
      label: t('Vitality coffees & drinks.', 'Cafés & boissons vitalité.'),
      color: 'text-amber-800',
      bgColor: 'bg-amber-50',
    },
    {
      icon: Sparkles,
      label: t('Molecular cosmetics.', 'Cosmétique moléculaire.'),
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Droplets,
      label: t('Hygiene & daily care.', 'Hygiène & soins quotidiens.'),
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
    },
    {
      icon: Leaf,
      label: t('Super-foods & detox.', 'Super-aliments & détox.'),
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      icon: Zap,
      label: t('Energy & performance.', 'Énergie & performance.'),
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      icon: Shield,
      label: t('Natural defenses.', 'Défenses naturelles.'),
      color: 'text-brand-violet',
      bgColor: 'bg-brand-violet/10',
    },
    {
      icon: Heart,
      label: t('Cardiovascular health.', 'Santé cardiovasculaire.'),
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      icon: Sun,
      label: t('Balance & sleep.', 'Équilibre & sommeil.'),
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      icon: Home,
      label: t('Home & bio ecology.', 'Maison & écologie bio.'),
      color: 'text-gray-800',
      bgColor: 'bg-gray-100',
    },
    {
      icon: Utensils,
      label: t('Precision nutrition.', 'Nutrition de précision.'),
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
    },
    {
      icon: Moon,
      label: t('Thyroid support.', 'Soutien de la thyroïde.'),
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      icon: Waves,
      label: t('Advanced hydration.', 'Hydratation avancée.'),
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Wind,
      label: t('Mental clarity & focus.', 'Clarté mentale & focus.'),
      color: 'text-sky-600',
      bgColor: 'bg-sky-50',
    },
    {
      icon: Smile,
      label: t('Stress management.', 'Gestion du stress.'),
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
    },
    {
      icon: FlaskConical,
      label: t('Hormonal balance.', 'Équilibre hormonal.'),
      color: 'text-violet-600',
      bgColor: 'bg-violet-50',
    },
    {
      icon: Thermometer,
      label: t('Metabolic regulation.', 'Régulation métabolique.'),
      color: 'text-orange-700',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <section className="relative py-12 lg:py-20 bg-white overflow-hidden">
      {/* Cinematic Ambient Backgrounds */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-[-10%] h-[1000px] w-[1000px] rounded-full bg-brand-violet/5 blur-[250px]" />
        <div className="absolute bottom-0 right-[-10%] h-[800px] w-[800px] rounded-full bg-brand-cyan/5 blur-[200px]" />
      </div>

      <div className="max-w-[1700px] mx-auto px-6 lg:px-16 relative z-10">
        {/* Top Section: Title + Description */}
        <div className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-20">
          <div className="max-w-4xl">
            <div className="mb-10 flex items-center gap-4">
              <span className="h-px w-12 bg-brand-violet" />
              <span className="text-xs font-black uppercase tracking-[0.5em] text-brand-violet">
                {t('Your vitality, everyday.', 'Votre vitalité, chaque jour.')}
              </span>
            </div>
            <h2 className="font-sans text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-tight">
              {t('Take back control', 'Reprenez le contrôle')} <br />
              <span className="text-brand-violet">{t('of your energy.', 'de votre énergie.')}</span>
            </h2>
          </div>
          <div className="max-w-xl text-right">
            <p className="text-2xl leading-relaxed text-gray-600 font-medium">
              {t('Discover comprehensive daily vitality solutions, designed to optimize your health and transform every day into an absolute performance experience.', 'Découvrez des solutions de vitalité quotidiennes complètes, conçues pour optimiser votre santé et transformer chaque journée en une expérience de performance absolue.')}
            </p>
          </div>
        </div>

        {/* Health Markers - Beautiful pills design */}
        <div className="hidden lg:flex flex-col gap-4">
          {/* Row 1: 5 items */}
          <div className="flex justify-center gap-4">
            {HEALTH_MARKERS.slice(0, 5).map((marker, index) => {
              const IconComponent = marker.icon;
              return (
                <div
                  key={index}
                  className="group bg-white shrink-0 rounded-full py-3 px-5 flex items-center justify-center gap-3 shadow-sm hover:shadow-lg border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <div className={`w-10 h-10 rounded-full ${marker.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-5 h-5 ${marker.color}`} strokeWidth={2.5} />
                  </div>
                  <span className="font-semibold whitespace-nowrap text-sm text-gray-900 group-hover:text-brand-violet transition-colors duration-300">
                    {marker.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Row 2: 6 items */}
          <div className="flex justify-center gap-4">
            {HEALTH_MARKERS.slice(5, 11).map((marker, index) => {
              const IconComponent = marker.icon;
              return (
                <div
                  key={index + 5}
                  className="group bg-white shrink-0 rounded-full py-3 px-5 flex items-center justify-center gap-3 shadow-sm hover:shadow-lg border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <div className={`w-10 h-10 rounded-full ${marker.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-5 h-5 ${marker.color}`} strokeWidth={2.5} />
                  </div>
                  <span className="font-semibold whitespace-nowrap text-sm text-gray-900 group-hover:text-brand-violet transition-colors duration-300">
                    {marker.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Row 3: 5 items */}
          <div className="flex justify-center gap-4">
            {HEALTH_MARKERS.slice(11, 16).map((marker, index) => {
              const IconComponent = marker.icon;
              return (
                <div
                  key={index + 11}
                  className="group bg-white shrink-0 rounded-full py-3 px-5 flex items-center justify-center gap-3 shadow-sm hover:shadow-lg border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <div className={`w-10 h-10 rounded-full ${marker.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-5 h-5 ${marker.color}`} strokeWidth={2.5} />
                  </div>
                  <span className="font-semibold whitespace-nowrap text-sm text-gray-900 group-hover:text-brand-violet transition-colors duration-300">
                    {marker.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile version: Grid */}
        <div className="lg:hidden grid grid-cols-2 gap-3">
          {HEALTH_MARKERS.map((marker, index) => {
            const IconComponent = marker.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-full py-2.5 px-3 flex items-center justify-center gap-2 shadow-sm border border-gray-100"
              >
                <div className={`w-8 h-8 rounded-full ${marker.bgColor} flex items-center justify-center shrink-0`}>
                  <IconComponent className={`w-4 h-4 ${marker.color}`} strokeWidth={2.5} />
                </div>
                <span className="font-semibold text-xs text-gray-900 text-center leading-tight">
                  {marker.label}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}


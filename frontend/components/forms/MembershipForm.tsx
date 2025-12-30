'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitMembership } from '@/lib/api';

// Schéma de validation
const membershipSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  country: z.string().min(2, 'Le pays est requis').optional().or(z.literal('')),
  city: z.string().optional(),
  company: z.string().optional(),
  position: z.string().optional(),
  source: z.string().optional(),
});

type MembershipFormData = z.infer<typeof membershipSchema>;

// Liste des pays africains
const africanCountries = [
  'Algérie', 'Angola', 'Bénin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cameroun',
  'Cap-Vert', 'Tchad', 'Comores', 'Congo', 'Côte d\'Ivoire', 'Djibouti', 'Égypte',
  'Guinée équatoriale', 'Érythrée', 'Eswatini', 'Éthiopie', 'Gabon', 'Gambie',
  'Ghana', 'Guinée', 'Guinée-Bissau', 'Kenya', 'Lesotho', 'Libéria', 'Libye',
  'Madagascar', 'Malawi', 'Mali', 'Maroc', 'Mauritanie', 'Maurice', 'Mozambique',
  'Namibie', 'Niger', 'Nigeria', 'Ouganda', 'Rwanda', 'São Tomé-et-Príncipe',
  'Sénégal', 'Seychelles', 'Sierra Leone', 'Somalie', 'Soudan', 'Soudan du Sud',
  'Tanzanie', 'Togo', 'Tunisie', 'Zambie', 'Zimbabwe'
];

export default function MembershipForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MembershipFormData>({
    resolver: zodResolver(membershipSchema),
  });

  const onSubmit = async (data: MembershipFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Nettoyer les champs vides
      const cleanedData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== '')
      ) as MembershipFormData;

      const result = await submitMembership(cleanedData);
      setSubmitStatus({ type: 'success', message: result.message || 'Adhésion soumise avec succès !' });
      reset();
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'envoi',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-xs font-black uppercase tracking-widest text-white">
            Prénom *
          </label>
          <input
            type="text"
            id="firstName"
            {...register('firstName')}
            placeholder="Jean"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-brand-violet focus:outline-none transition-all placeholder:text-gray-600 focus:bg-white/10"
          />
          {errors.firstName && (
            <p className="text-red-400 text-xs mt-1">{errors.firstName.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="lastName" className="text-xs font-black uppercase tracking-widest text-white">
            Nom *
          </label>
          <input
            type="text"
            id="lastName"
            {...register('lastName')}
            placeholder="Dupont"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-brand-violet focus:outline-none transition-all placeholder:text-gray-600 focus:bg-white/10"
          />
          {errors.lastName && (
            <p className="text-red-400 text-xs mt-1">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-white">
          Email *
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          placeholder="jean@example.com"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-brand-violet focus:outline-none transition-all placeholder:text-gray-600 focus:bg-white/10"
        />
        {errors.email && (
          <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="phone" className="text-xs font-black uppercase tracking-widest text-white">
            Téléphone
          </label>
          <input
            type="tel"
            id="phone"
            {...register('phone')}
            placeholder="+228 92 00 00 00"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-brand-violet focus:outline-none transition-all placeholder:text-gray-600 focus:bg-white/10"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="country" className="text-xs font-black uppercase tracking-widest text-white">
            Pays
          </label>
          <select
            id="country"
            {...register('country')}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-brand-violet focus:outline-none transition-all focus:bg-white/10"
          >
            <option value="">Sélectionner un pays</option>
            {africanCountries.map((country) => (
              <option key={country} value={country} className="bg-dark-bg">
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="city" className="text-xs font-black uppercase tracking-widest text-white">
          Ville
        </label>
        <input
          type="text"
          id="city"
          {...register('city')}
          placeholder="Lomé"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-brand-violet focus:outline-none transition-all placeholder:text-gray-600 focus:bg-white/10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="company" className="text-xs font-black uppercase tracking-widest text-white">
            Entreprise
          </label>
          <input
            type="text"
            id="company"
            {...register('company')}
            placeholder="Nom de l'entreprise"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-brand-violet focus:outline-none transition-all placeholder:text-gray-600 focus:bg-white/10"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="position" className="text-xs font-black uppercase tracking-widest text-white">
            Poste
          </label>
          <input
            type="text"
            id="position"
            {...register('position')}
            placeholder="Votre fonction"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-brand-violet focus:outline-none transition-all placeholder:text-gray-600 focus:bg-white/10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="source" className="text-xs font-black uppercase tracking-widest text-white">
          Comment avez-vous connu Yupi Global ?
        </label>
        <select
          id="source"
          {...register('source')}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-brand-violet focus:outline-none transition-all focus:bg-white/10"
        >
          <option value="">Sélectionner une option</option>
          <option value="recherche" className="bg-dark-bg">Recherche en ligne</option>
          <option value="reseau" className="bg-dark-bg">Réseau social</option>
          <option value="recommandation" className="bg-dark-bg">Recommandation</option>
          <option value="evenement" className="bg-dark-bg">Événement</option>
          <option value="autre" className="bg-dark-bg">Autre</option>
        </select>
      </div>

      {submitStatus && (
        <div
          className={`p-4 rounded-xl ${
            submitStatus.type === 'success'
              ? 'bg-green-500/20 border border-green-500/30 text-green-400'
              : 'bg-red-500/20 border border-red-500/30 text-red-400'
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-10 py-5 bg-brand-violet text-white rounded-full font-black text-sm uppercase tracking-widest hover:bg-brand-violet/90 transition-all shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:shadow-[0_0_50px_rgba(124,58,237,0.4)] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Envoi en cours...' : 'Adhérer maintenant'}
      </button>
    </form>
  );
}


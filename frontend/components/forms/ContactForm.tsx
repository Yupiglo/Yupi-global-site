'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitContact } from '@/lib/api';

// Schéma de validation
const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  subject: z.string().min(3, 'Le sujet doit contenir au moins 3 caractères'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await submitContact(data);
      setSubmitStatus({ type: 'success', message: result.message || 'Message envoyé avec succès !' });
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-3">
          <label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-brand-cyan ml-2">
            Nom Complet
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            placeholder="Jean Dupont"
            className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-brand-violet focus:outline-none transition-all placeholder:text-gray-600 focus:bg-white/10"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1 ml-2">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-3">
          <label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-brand-cyan ml-2">
            Email Professionnel
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            placeholder="jean@example.com"
            className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-brand-violet focus:outline-none transition-all placeholder:text-gray-600 focus:bg-white/10"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1 ml-2">{errors.email.message}</p>
          )}
        </div>
      </div>
      <div className="space-y-3">
        <label htmlFor="subject" className="text-[10px] font-black uppercase tracking-widest text-brand-cyan ml-2">
          Objet de la Demande
        </label>
        <input
          type="text"
          id="subject"
          {...register('subject')}
          placeholder="Consultation, Partenariat, Question..."
          className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-brand-violet focus:outline-none transition-all placeholder:text-gray-600 focus:bg-white/10"
        />
        {errors.subject && (
          <p className="text-red-400 text-sm mt-1 ml-2">{errors.subject.message}</p>
        )}
      </div>
      <div className="space-y-3">
        <label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest text-brand-cyan ml-2">
          Votre Message
        </label>
        <textarea
          id="message"
          {...register('message')}
          rows={6}
          placeholder="Comment pouvons-nous vous aider à atteindre vos objectifs de bien-être ?"
          className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-brand-violet focus:outline-none transition-all placeholder:text-gray-600 focus:bg-white/10 resize-none"
        />
        {errors.message && (
          <p className="text-red-400 text-sm mt-1 ml-2">{errors.message.message}</p>
        )}
      </div>

      {submitStatus && (
        <div
          className={`p-4 rounded-2xl ${
            submitStatus.type === 'success'
              ? 'bg-green-500/20 border border-green-500/30 text-green-400'
              : 'bg-red-500/20 border border-red-500/30 text-red-400'
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <div className="pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-12 py-6 bg-brand-violet text-white rounded-full font-black text-lg uppercase tracking-widest hover:bg-brand-violet/90 transition-all shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:shadow-[10_0_60px_rgba(124,58,237,0.6)] hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
        </button>
      </div>
    </form>
  );
}


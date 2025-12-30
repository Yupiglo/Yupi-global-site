import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Projet - Yupi Global',
  description: 'Détails du projet',
};

export default function PortfolioDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <Link
          href="/portfolio"
          className="text-blue-600 hover:text-blue-700 mb-8 inline-block"
        >
          ← Retour au portfolio
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="aspect-video relative bg-gray-200 rounded-lg overflow-hidden mb-8">
            <Image
              src="/media/2025/08/WhatsApp-Image-2025-12-02-at-11.15.38-AM-870x457.jpeg"
              alt="Projet"
              fill
              className="object-cover"
            />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Projet {params.slug}
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-4">
              Détails du projet seront affichés ici. Cette page sera connectée à l&apos;API backend
              pour récupérer les informations dynamiques du portfolio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


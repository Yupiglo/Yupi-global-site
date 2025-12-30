import Hero from '@/components/sections/Hero';
import HealthOptimization from '@/components/sections/HealthOptimization';
import Services from '@/components/sections/Services';
import ProductsMall from '@/components/sections/ProductsMall';
import OursGallery from '@/components/sections/OursGallery';
import Portfolio from '@/components/sections/Portfolio';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import Partners from '@/components/sections/Partners';
import CTA from '@/components/sections/CTA';

export default function Home() {
  return (
    <div className="flex flex-col overflow-x-clip">
      <Hero />
      <HealthOptimization />
      <Services />
      <ProductsMall />
      <OursGallery />
      <Portfolio />
      <Testimonials />
      <FAQ />
      <Partners />
      <CTA />
    </div>
  );
}

import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollControls from "@/components/ui/ScrollControls";
import { LanguageProvider } from "@/context/LanguageContext";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yupi Global - Health & Wellness in Africa",
  description: "Yupi Global is your trusted partner for health and wellness in Africa. Discover our products and services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <html lang="en">
        <body
          className={`${figtree.variable} antialiased font-sans`}
          style={{ fontFamily: 'var(--font-figtree), sans-serif' }}
        >
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <ScrollControls />
        </body>
      </html>
    </LanguageProvider>
  );
}

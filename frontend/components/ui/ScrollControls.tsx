"use client";

import { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

export default function ScrollControls() {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
        });
    };

    return (
        <div className={`fixed bottom-8 right-8 z-[9999] flex flex-col gap-4 transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
            {/* Scroll Down Button (Optional: always show or show based on logic. Let's show both when scrolled) */}
            <button
                onClick={scrollToTop}
                className="group relative h-14 w-14 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:bg-brand-violet hover:border-brand-violet/50 hover:-translate-y-1 shadow-2xl"
                aria-label="Scroll to Top"
            >
                <div className="absolute inset-0 rounded-full bg-brand-violet/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <ArrowUp className="w-6 h-6 relative z-10" />
            </button>

            <button
                onClick={scrollToBottom}
                className="group relative h-14 w-14 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:bg-brand-cyan hover:border-brand-cyan/50 hover:translate-y-1 shadow-2xl"
                aria-label="Scroll to Bottom"
            >
                <div className="absolute inset-0 rounded-full bg-brand-cyan/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <ArrowDown className="w-6 h-6 relative z-10" />
            </button>
        </div>
    );
}

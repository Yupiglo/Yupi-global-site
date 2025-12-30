"use client";

import { useEffect, useRef, useState } from 'react';

interface ProgressBarProps {
    label: string;
    percentage: number;
    color?: 'violet' | 'cyan';
    delay?: number;
}

export default function ProgressBar({ label, percentage, color = 'violet', delay = 0 }: ProgressBarProps) {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                setProgress(percentage);
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [isVisible, percentage, delay]);

    const colorClasses = {
        violet: 'bg-brand-violet',
        cyan: 'bg-brand-cyan'
    };

    const glowClasses = {
        violet: 'shadow-[0_0_15px_rgba(124,58,237,0.5)]',
        cyan: 'shadow-[0_0_15px_rgba(34,211,238,0.5)]'
    };

    return (
        <div ref={containerRef} className="space-y-4">
            <div className="flex justify-between items-end">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-900">{label}</span>
                <span className={`text-sm font-black ${color === 'violet' ? 'text-brand-violet' : 'text-brand-cyan'}`}>
                    {progress}%
                </span>
            </div>
            <div className="relative h-[6px] w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                    className={`absolute top-0 left-0 h-full ${colorClasses[color]} ${glowClasses[color]} transition-all duration-1500 ease-out rounded-full`}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}

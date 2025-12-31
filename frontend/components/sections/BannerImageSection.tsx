'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Modified Positions to fix the "rear shape" issue.
// Problem: Rear images (-40rem) are too small/distorted compared to the huge front image (90%).
// Solution: Reduce Z-depth significantly so they stay relatively large, and increase X-spread.

interface PositionData {
    className: string;
    style: React.CSSProperties;
    zIndex: number;
    opacity: number;
    width: string;
}

const POSITIONS: PositionData[] = [
    // 0: Center (Front)
    {
        className: 'banner-image-five',
        style: {
            transform: 'translate(-50%, 0) translate3d(0%, 0px, 0rem)', // Simplified 0
            transformStyle: 'preserve-3d'
        },
        zIndex: 30,
        opacity: 1,
        width: 'w-[105%] md:w-[95%]'
    },
    // 1: Center Right
    {
        className: 'banner-image-one',
        style: {
            // Lift slightly (-2%) to avoid bottom edge peeking
            transform: 'translate(-50%, 0) translate3d(12%, 0px, -12rem)',
            transformStyle: 'preserve-3d'
        },
        zIndex: 20,
        opacity: 1,
        width: 'w-[90%] md:w-[70%]'
    },
    // 2: Far Right
    {
        className: 'banner-image-two',
        style: {
            // Lift more (-4%) as it's further back
            transform: 'translate(-50%, 0) translate3d(30%, 0px, -25rem)',
            transformStyle: 'preserve-3d'
        },
        zIndex: 10,
        opacity: 0.9,
        width: 'w-[90%] md:w-[70%]'
    },
    // 3: Far Left
    {
        className: 'banner-image-three',
        style: {
            transform: 'translate(-50%, 0) translate3d(-30%, 0px, -25rem)',
            transformStyle: 'preserve-3d'
        },
        zIndex: 10,
        opacity: 0.9,
        width: 'w-[90%] md:w-[70%]'
    },
    // 4: Center Left
    {
        className: 'banner-image-four',
        style: {
            transform: 'translate(-50%, 0) translate3d(-12%, 0px, -12rem)',
            transformStyle: 'preserve-3d'
        },
        zIndex: 20,
        opacity: 1,
        width: 'w-[90%] md:w-[70%]'
    }
];

import { getBannerSettings, BannerImage } from '@/lib/api';

const DEFAULT_IMAGES: BannerImage[] = [
    {
        src: "https://cdn.prod.website-files.com/6893be5fa7ae6a8ad74cf406/68bd3544ad1671344f161ab4_Futuristic%20VR%20Portrait%206.png",
        alt: "Futuristic VR Portrait 6",
        width: 1172,
        height: 800
    },
    {
        src: "https://cdn.prod.website-files.com/6893be5fa7ae6a8ad74cf406/68bc4b77d8c4f0f2597507c9_Contemplative%20Portrait%20with%20Neon%20Rim%20Lighting%203.png",
        alt: "Contemplative Portrait",
        width: 1168,
        height: 800
    },
    {
        src: "https://cdn.prod.website-files.com/6893be5fa7ae6a8ad74cf406/68bd3315bdad68f1ceeb4aeb_Futuristic%20VR%20Portrait%205.png",
        alt: "Futuristic VR Portrait",
        width: 1171,
        height: 800
    },
    {
        src: "https://cdn.prod.website-files.com/6893be5fa7ae6a8ad74cf406/68bd33b360564ecc008182c9_Contemplative%20Man%20Silhouette%205.png",
        alt: "Contemplative Man Silhouette",
        width: 1171,
        height: 800
    },
    {
        src: "https://cdn.prod.website-files.com/6893be5fa7ae6a8ad74cf406/68bd35cbb70c6bf9ec2ffe54_Contemplative%20Man%20Silhouette%206.png",
        alt: "Contemplative Man Silhouette 6",
        width: 1172,
        height: 800
    }
];

const BannerImageSection = () => {
    const [offset, setOffset] = useState(0);
    const [images, setImages] = useState<BannerImage[]>(DEFAULT_IMAGES);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const data = await getBannerSettings();
                if (data && Array.isArray(data) && data.length > 0) {
                    setImages(data);
                }
            } catch (error) {
                console.error("Failed to load banner settings:", error);
            }
        };

        fetchImages();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setOffset((prev) => (prev + 1) % POSITIONS.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="banner-section py-20 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="banner-main-wrapper flex justify-center items-center w-full">
                    <div
                        className="banner-image-wrap flex justify-center items-center w-full relative h-[500px] md:h-[700px] preserve-3d perspective-1000"
                        style={{ perspectiveOrigin: '50% 90%' }} // Keep bottom perspective
                    >
                        <div className="images-wrapper relative w-full h-full flex justify-center items-center preserve-3d">
                            <div className="image-container relative w-full max-w-6xl h-full preserve-3d flex justify-center items-end">
                                {images.map((img, index) => {
                                    const positionIndex = (index + offset) % POSITIONS.length;
                                    const pos = POSITIONS[positionIndex];

                                    return (
                                        <div
                                            key={index}
                                            className={`${pos.className} absolute bottom-[10%] left-1/2 ${pos.width} h-auto transition-all duration-1000 ease-in-out`}
                                            style={{
                                                ...pos.style,
                                                zIndex: pos.zIndex,
                                                opacity: pos.opacity,
                                            }}
                                        >
                                            <Image
                                                src={img.src}
                                                alt={img.alt}
                                                width={img.width}
                                                height={img.height}
                                                className="w-full h-auto rounded-2xl"
                                                priority={positionIndex === 0}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BannerImageSection;

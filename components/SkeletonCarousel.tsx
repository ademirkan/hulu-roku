"use client";

import React from "react";
import styles from "./Carousel.module.css";

interface CarouselProps {
    imgSrcs: string[];
}

export default function SkeletonCarousel() {
    return (
        <div className="relative w-[100vw] -ml-[calc((100vw-100%)/2)]">
            <div
                className={`
                    relative flex gap-6 no-scrollbar p-5 w-[calc(100vw)]
                    overflow-x-auto overscroll-auto px-12
                    ${styles.maskGradient}
                `}
            >
                {Array.from({ length: 10 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-80 aspect-[1.78] hover:cursor-pointer"
                    >
                        <div className="relative w-full h-full object-cover shadow-lg shadow-black rounded-[4px] hover:scale-105 duration-300 ease-out outline outline-[3px] outline-offset-4 outline-transparent hover:outline-white hover:z-10 transition-all bg-gradient-to-b from-black/50 to-black/20"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

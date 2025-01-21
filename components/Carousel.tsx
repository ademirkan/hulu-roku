"use client";

import React from "react";
import styles from "./Carousel.module.css";
import Image from "next/image";
interface CarouselProps {
    imgSrcs: string[];
}

export default function Carousel({ imgSrcs }: CarouselProps) {
    if (!imgSrcs || imgSrcs.length === 0) return null;

    return (
        <div className="relative w-[100vw] -ml-[calc((100vw-100%)/2)]">
            <div
                className={`
                    relative flex gap-6 no-scrollbar p-5 w-[calc(100vw)]
                    overflow-x-auto overscroll-auto px-12
                    ${styles.maskGradient}
                `}
            >
                {imgSrcs.map((src, index) => (
                    <div
                        key={index}
                        className="relative flex-shrink-0 w-80 aspect-[1.78] hover:cursor-pointer"
                    >
                        <Image
                            src={src}
                            alt={`Carousel image ${index + 1}`}
                            fill
                            draggable={false}
                            placeholder="empty"
                            priority
                            className="relative object-cover shadow-lg shadow-black rounded-[4px] hover:scale-105 duration-300 ease-out outline outline-[3px] outline-offset-4 outline-transparent hover:outline-white hover:z-10 transition-all"
                            onError={(e) => {
                                const container = e.currentTarget.parentElement;
                                if (container) {
                                    container.style.display = "none";
                                    container.style.position = "absolute";
                                }
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

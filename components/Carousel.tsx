"use client";

import React, { useEffect, useRef } from "react";
import styles from "./Carousel.module.css";
import Image from "next/image";

interface CarouselProps {
    imgSrcs: string[];
}

export default function Carousel({ imgSrcs }: CarouselProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = React.useState(false);
    const [canScrollRight, setCanScrollRight] = React.useState(false);

    if (!imgSrcs || imgSrcs.length === 0) return null;

    const updateScrollState = () => {
        if (!scrollContainerRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } =
            scrollContainerRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    };

    useEffect(() => {
        updateScrollState();
        window.addEventListener("resize", updateScrollState);
        return () => {
            window.removeEventListener("resize", updateScrollState);
        };
    }, [imgSrcs]);

    const handleScroll = (direction: "left" | "right") => {
        if (!scrollContainerRef.current) return;
        const { scrollLeft, clientWidth } = scrollContainerRef.current;
        const newScrollLeft =
            direction === "left"
                ? scrollLeft - clientWidth
                : scrollLeft + clientWidth;
        scrollContainerRef.current.scroll({
            left: newScrollLeft,
            behavior: "smooth",
        });
    };

    return (
        <div className="relative group w-[100vw] -ml-[calc((100vw-100%)/2)]">
            {canScrollLeft && (
                <button
                    className="absolute z-10 left-5 top-1/2 -translate-y-1/2
                               bg-black bg-opacity-60 text-white rounded-full w-8 h-8
                               flex items-center justify-center hover:bg-opacity-80
                               opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={() => handleScroll("left")}
                >
                    ←
                </button>
            )}
            {canScrollRight && (
                <button
                    className="absolute z-10 right-5 top-1/2 -translate-y-1/2
                               bg-black bg-opacity-60 text-white rounded-full w-8 h-8
                               flex items-center justify-center hover:bg-opacity-80
                               opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={() => handleScroll("right")}
                >
                    →
                </button>
            )}

            <div
                ref={scrollContainerRef}
                onScroll={updateScrollState}
                className={`
                    relative flex gap-6 no-scrollbar p-5
                    w-[calc(100vw)] overflow-x-auto overscroll-auto px-12
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
                            className="relative object-cover shadow-lg shadow-black rounded-[4px]
                                       hover:scale-105 duration-300 ease-out outline outline-[3px]
                                       outline-offset-4 outline-transparent hover:outline-white hover:z-10
                                       transition-all"
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

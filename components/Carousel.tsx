"use client";

import React from "react";
import styles from "./Carousel.module.css";
import Card from "./Card";

interface CarouselProps {
    imgSrcs: string[];
}

export default function Carousel({ imgSrcs }: CarouselProps) {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = React.useState(false);
    const [canScrollRight, setCanScrollRight] = React.useState(false);

    const updateScrollState = React.useCallback(() => {
        if (!scrollContainerRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } =
            scrollContainerRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }, []);

    React.useEffect(() => {
        if (!imgSrcs || imgSrcs.length === 0) return;
        updateScrollState();
        window.addEventListener("resize", updateScrollState);
        return () => {
            window.removeEventListener("resize", updateScrollState);
        };
    }, [imgSrcs, updateScrollState]);

    if (!imgSrcs || imgSrcs.length === 0) return null;

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
                    <Card
                        key={index}
                        src={src}
                        alt={`Carousel image ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

import React from "react";

interface CarouselProps {
    imgSrcs: string[];
}

export default function Carousel({ imgSrcs }: CarouselProps) {
    if (!imgSrcs || imgSrcs.length === 0) return null;

    return (
        <div className="relative flex left-[calc(var(--padding)*-1)] pl-[var(--padding)] gap-6 overflow-x-auto no-scrollbar p-5 w-[100vw]">
            {imgSrcs.map((src, index) => (
                <div
                    key={index}
                    className="flex-shrink-0 w-80 aspect-[1.78] snap-center hover:cursor-pointer"
                >
                    <img
                        src={src}
                        alt={`Carousel image ${index + 1}`}
                        className="relative w-full h-full object-cover shadow-lg shadow-black rounded-[4px] hover:scale-105 duration-300 ease-out outline outline-[3px] outline-offset-4 outline-transparent hover:outline-white hover:z-10 transition-all"
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
    );
}

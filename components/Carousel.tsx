import React from "react";

interface CarouselProps {
    imgSrcs: string[];
}

export default function Carousel({ imgSrcs }: CarouselProps) {
    if (!imgSrcs || imgSrcs.length === 0) return null;

    return (
        <div className="overflow-x-auto flex gap-6 p-8 snap-x snap-mandatory no-scrollbar">
            {imgSrcs.map((src, index) => (
                <div
                    key={index}
                    className="flex-shrink-0 w-60 aspect-[1.78] snap-center hover:cursor-pointer hover:scale-110"
                >
                    <img
                        src={src}
                        alt={`Carousel image ${index + 1}`}
                        className="w-full h-full object-cover shadow-lg shadow-black/50 rounded-[4px]"
                        onError={(e) => {
                            e.currentTarget.style.display = "none";
                        }}
                    />
                </div>
            ))}
        </div>
    );
}

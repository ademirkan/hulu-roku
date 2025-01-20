import React from "react";

interface CarouselProps {
    imgSrcs: string[];
}

const Carousel = ({ imgSrcs }: CarouselProps) => {
    if (!imgSrcs || imgSrcs.length === 0) return null;

    return (
        <div className="overflow-x-visible">
            <div className="flex flex-row gap-4 overflow-x-scroll no-scrollbar p-4">
                {imgSrcs.map((src, index) => (
                    <div
                        key={index}
                        className="transition-transform duration-200 hover:scale-110"
                    >
                        <img
                            className="aspect-[1.78] drop-shadow-lg shadow-pink-500"
                            src={src}
                            alt={`Carousel image ${index + 1}`}
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
};

export default Carousel;

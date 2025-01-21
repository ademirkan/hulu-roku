"use client";

import { useState } from "react";
import Image from "next/image";

export default function Card({
    src,
    alt,
    width,
    height,
}: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
}) {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    if (error) {
        return <></>;
    }

    return (
        <div
            className="relative flex-shrink-0 w-80 aspect-[1.78] hover:cursor-pointer shadow-lg shadow-black rounded-[4px]
                    hover:scale-105 duration-300 ease-out outline outline-[3px]
                    outline-offset-4 outline-transparent hover:outline-white hover:z-10
                    transition-all"
        >
            <Image
                src={src}
                alt={alt}
                fill
                draggable={false}
                placeholder="empty"
                loading="lazy"
                className={`relative object-cover 
                    ${
                        loaded ? "opacity-100" : "opacity-0"
                    } transition-all duration-300 ease-out`}
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
            />
        </div>
    );
}

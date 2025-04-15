import React from "react";
import Image from "next/image";

const HeroComponent = () => {
    return (
        <div className="relative w-full h-[85vh]">
            <Image
                className="opacity-40"
                src="/hero.jpg"
                alt="hero"
                layout="fill"
                objectFit="cover"
                priority
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                <p className="text-4xl font-semibold">
                    <span className="title">Magneto Collect</span> The power to choose the extraordinary.
                </p>
            </div>
        </div>
    );
};

export default HeroComponent;

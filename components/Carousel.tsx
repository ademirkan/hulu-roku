interface CarouselProps {
    imgSrcs: string[];
}

const Carousel = ({ imgSrcs }: CarouselProps) => {
    console.log(imgSrcs);
    return (
        <div className="flex flex-row gap-4">
            {imgSrcs.map((src, index) => (
                <img
                    key={index}
                    src={src}
                    alt={`Carousel image ${index + 1}`}
                />
            ))}
        </div>
    );
};

export default Carousel;

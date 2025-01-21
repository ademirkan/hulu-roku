import { StaticCollectionProps } from "@/types/Collection";
import Carousel from "./Carousel";
import SkeletonCarousel from "./SkeletonCarousel";

const SkeletonCollection = () => {
    return (
        <div className="relative flex flex-col overflow-x-visible">
            <h2 className="text-2xl font-bold">&nbsp;</h2>
            <SkeletonCarousel />
        </div>
    );
};

export default SkeletonCollection;

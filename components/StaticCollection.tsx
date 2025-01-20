import { StaticCollectionProps } from "@/types/Collection";
import Carousel from "./Carousel";

const StaticCollection = ({ title, items }: StaticCollectionProps) => {
    return (
        <div className="relative flex flex-col overflow-x-visible">
            <h2 className="relative text-xl font-bold z-10">{title}</h2>
            <Carousel
                imgSrcs={items.map(
                    (item) =>
                        item.image.tile["1.78"][
                            Object.keys(item.image.tile["1.78"])[0]
                        ].default.url
                )}
            />
        </div>
    );
};

export default StaticCollection;

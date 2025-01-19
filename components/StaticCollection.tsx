import { StaticCollectionProps } from "@/types/Collection";
import Carousel from "./Carousel";

const StaticCollection = ({ title, items }: StaticCollectionProps) => {
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">{title}</h2>
            <div className="flex flex-col gap-2">
                <Carousel
                    imgSrcs={items.map(
                        (item) =>
                            item.image.tile["1.78"][
                                Object.keys(item.image.tile["1.78"])[0]
                            ].default.url
                    )}
                />
            </div>
        </div>
    );
};

export default StaticCollection;

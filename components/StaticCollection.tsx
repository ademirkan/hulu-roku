import { StaticCollectionProps } from "@/types/Collection";

const StaticCollection = ({ title, items }: StaticCollectionProps) => {
    console.log("_____________________");
    console.log(title);
    console.log(items);
    console.log("_____________________");
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">{title}</h2>
            <div className="flex flex-col gap-2">
                {items.map((item) => {
                    return (
                        <div key={item.contentId || item.collectionId}>
                            {item.contentId || item.collectionId}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StaticCollection;

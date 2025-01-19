import { useEffect, useState } from "react";
import { StaticCollectionProps } from "@/types/Collection";

interface DynamicCollectionProps {
    title: string;
    refId: string;
}

const DynamicCollection = ({ title, refId }: DynamicCollectionProps) => {
    const [items, setItems] = useState<StaticCollectionProps["items"]>([]);

    useEffect(() => {
        (async () => {
            try {
                const collectionRes = await fetch(
                    `https://cd-static.bamgrid.com/dp-117731241344/sets/${refId}.json`
                );
                const collectionData = await collectionRes.json();
                const dataKey = Object.keys(collectionData.data)[0];
                setItems(collectionData.data[dataKey].items);
            } catch (e) {
                console.error("DynamicCollection fetch error:", e);
            }
        })();
    }, [refId]);

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">{title}</h2>
            <div className="flex flex-col gap-2">
                {items.map((item) => (
                    <div key={item.contentId || item.collectionId}>
                        {item.contentId || item.collectionId}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DynamicCollection;

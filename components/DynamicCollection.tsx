"use client";

import { useEffect, useState } from "react";
import { StaticCollectionProps } from "@/types/Collection";
import StaticCollection from "./StaticCollection";
import SkeletonCollection from "./SkeletonCollection";

interface DynamicCollectionProps {
    title: string;
    refId: string;
}

const DynamicCollection = ({ title, refId }: DynamicCollectionProps) => {
    const [items, setItems] = useState<StaticCollectionProps["items"]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const collectionRes = await fetch(
                    `https://cd-static.bamgrid.com/dp-117731241344/sets/${refId}.json`
                );
                const collectionData = await collectionRes.json();
                const dataKey = Object.keys(collectionData.data)[0];
                setItems(collectionData.data[dataKey].items);
                setIsLoading(false);
            } catch (e) {
                console.error("DynamicCollection fetch error:", e);
            }
        })();
    }, [refId]);

    return (
        <>
            {isLoading ? (
                <SkeletonCollection />
            ) : (
                <StaticCollection title={title} items={items} />
            )}
        </>
    );
};

export default DynamicCollection;

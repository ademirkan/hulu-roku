import {
    DynamicCollectionProps,
    StaticCollectionProps,
} from "@/types/Collection";
import { useEffect, useState } from "react";

const useCollections = () => {
    const [collections, setCollections] = useState<
        (StaticCollectionProps | DynamicCollectionProps)[]
    >([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const homeRes = await fetch(
                "https://cd-static.bamgrid.com/dp-117731241344/home.json"
            );
            const homeData = await homeRes.json();

            const containers = homeData.data.StandardCollection.containers.map(
                (container: any) => container.set
            );

            const collections = containers.map((container: any) => {
                if (container.items) {
                    return {
                        title: container.text.title.full.set.default.content,
                        items: container.items,
                    };
                }
                return {
                    title: container.text.title.full.set.default.content,
                    refId: container.refId,
                };
            });

            setLoading(false);
            setCollections(collections);
        })();
    }, []);

    return { collections, loading };
};

export default useCollections;

"use client";
import { useEffect, useState } from "react";
import Collection from "../components/StaticCollection";
import StaticCollection from "../components/StaticCollection";
import { StaticCollectionProps } from "@/types/Collection";

export default function Home() {
    const [collections, setCollections] = useState<StaticCollectionProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const homeRes = await fetch(
                "https://cd-static.bamgrid.com/dp-117731241344/home.json"
            );
            const homeData = await homeRes.json();

            console.log("homeData");
            console.log(homeData);

            const containers = homeData.data.StandardCollection.containers.map(
                (container: any) => container.set
            );

            // Map over containers, fetching in parallel for those without items
            const results = await Promise.all(
                containers.map(async (container: any) => {
                    const title = container.text.title.full.set.default.content;
                    if (container.items && container.items.length > 0) {
                        return { title, items: container.items };
                    }
                    const collectionRes = await fetch(
                        `https://cd-static.bamgrid.com/dp-117731241344/sets/${container.refId}.json`
                    );
                    const collectionData = await collectionRes.json();

                    const items =
                        collectionData.data[Object.keys(collectionData.data)[0]]
                            .items;

                    return { title, items };
                })
            );

            setLoading(false);
            setCollections(results);
        })();
    }, []);

    return (
        <div>
            {!loading && collections.length > 0 ? (
                collections.map((collection) => {
                    return (
                        <StaticCollection
                            key={collection.title}
                            title={collection.title}
                            items={collection.items}
                        />
                    );
                })
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

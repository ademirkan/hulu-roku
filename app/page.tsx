"use client";
import StaticCollection from "../components/StaticCollection";
import DynamicCollection from "@/components/DynamicCollection";
import useCollections from "@/hooks/useCollections";

export default function Home() {
    const { collections, loading } = useCollections();
    console.log(collections);

    return (
        <div className="flex flex-col gap-4">
            {!loading && collections.length > 0 ? (
                collections.map((collection) =>
                    "items" in collection ? (
                        <StaticCollection
                            key={collection.title}
                            title={collection.title}
                            items={collection.items}
                        />
                    ) : (
                        <DynamicCollection
                            key={collection.title}
                            title={collection.title}
                            refId={collection.refId}
                        />
                    )
                )
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

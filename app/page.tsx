import StaticCollection from "../components/StaticCollection";
import DynamicCollection from "@/components/DynamicCollection";

async function fetchCollections() {
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

    return collections;
}

export default async function Home() {
    const collections = await fetchCollections();
    return (
        <>
            <div>header</div>
            <div>hero</div>
            <div className="flex flex-col gap-8">
                {collections.length > 0 ? (
                    collections.map((collection: any) =>
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
        </>
    );
}

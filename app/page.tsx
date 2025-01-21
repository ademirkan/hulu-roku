import StaticCollection from "../components/StaticCollection";
import DynamicCollection from "@/components/DynamicCollection";
import Image from "next/image";

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
            <header className="fixed flex flex-row items-center justify-between top-0 left-0 w-full bg-nav z-20 px-[var(--padding)] py-4">
                <div className="flex flex-row items-center gap-12">
                    <Image
                        src="/disney.png"
                        alt="logo"
                        width={75}
                        height={100}
                        draggable={false}
                    />
                    <nav className="relative top-1 hover:cursor-pointer">
                        <Image
                            draggable={false}
                            src="/navbar.png"
                            alt="search"
                            width={750}
                            height={100}
                        />
                    </nav>
                </div>
                <Image
                    draggable={false}
                    src="/avatar.png"
                    alt="avatar"
                    width={50}
                    height={50}
                    className="hover:cursor-pointer rounded-full"
                />
            </header>
            <div className="flex flex-col gap-8 pt-32">
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

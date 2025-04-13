"use client";
import Image from "next/image";

import { useEffect, useRef, useState } from "react";

import { useVirtualizer } from "@tanstack/react-virtual";

type PlaylistItem = {
	description: string;
	href: string;
	id: string;
	image: string;
	name: string;
	tracks: {
		href: string;
		total: number;
	};
};

const PlaylistItem = ({ item }: { item: PlaylistItem }) => {
	return (
		<div className="flex gap-x-3 bg-muted p-2 border-1 border-background h-24">
			<Image
				src={item.image}
				height={75}
				width={75}
				alt={item.name}
				className="aspect-square"
			/>
			<div className="flex flex-col justify-center">
				<p className="font-bold text-xl">{item.name}</p>
				<p className="italic text-sm">{item.description}</p>
			</div>
		</div>
	);
};

const Playlists = () => {
	const parentRef = useRef<HTMLDivElement>(null);

	const [playlistData, setPlaylistData] = useState<PlaylistItem[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchPlaylists = async () => {
			try {
				const res = await fetch("/api/playlists");
				const data = await res.json();
				setPlaylistData(data.playlists.items);
				console.log(data);
			} catch (error) {
				console.error("Error fetching playlists: ", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchPlaylists();
	}, []);

	const rowVirtualizer = useVirtualizer({
		count: playlistData.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 100,
		overscan: 1,
	});

	return (
		<div>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<div className="h-64 w-1/4 bg-muted overflow-y-scroll" ref={parentRef}>
					<div
						className="w-full relative"
						style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
					>
						{rowVirtualizer.getVirtualItems().map((virtualItem) => (
							<div
								key={virtualItem.index}
								className="absolute top-0 left-0 w-full"
								style={{
									height: `${virtualItem.size}px`,
									transform: `translateY(${virtualItem.start}px)`,
								}}
							>
								<PlaylistItem item={playlistData[virtualItem.index]} />
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Playlists;

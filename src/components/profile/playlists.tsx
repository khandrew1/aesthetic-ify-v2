"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

import type { PlaylistItemType, PlaylistAPIResponse } from "@/types/playlist";

const PlaylistItem = ({ item }: { item: PlaylistItemType }) => {
	return (
		<div className="flex gap-x-3 bg-muted p-2 border-1 border-background h-24">
			<Image
				src={item.image || ""}
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

	const fetchPlaylists = async ({ pageParam }: { pageParam: number }) => {
		console.log("Page param: ", pageParam);

		try {
			const res = await fetch(`/api/playlists?last=${pageParam}`);
			const data = await res.json();

			return data;
		} catch (error) {
			console.error("Error fetching playlists: ", error);
		}
	};

	const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
		useInfiniteQuery({
			queryKey: ["playlists"],
			queryFn: fetchPlaylists,
			initialPageParam: 0,
			getNextPageParam: (lastPage: PlaylistAPIResponse) => lastPage.next,
			placeholderData: keepPreviousData,
		});

	const flatData = data ? data.pages.flatMap((d) => d.res.items) : [];

	const rowVirtualizer = useVirtualizer({
		count: flatData.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 96,
		overscan: 1,
	});

	useEffect(() => {
		const scrollElement = parentRef.current;
		if (!scrollElement) return;

		const handleScroll = () => {
			const { scrollTop, clientHeight, scrollHeight } = scrollElement;

			if (
				scrollTop + clientHeight >= scrollHeight - 20 &&
				hasNextPage &&
				!isFetchingNextPage
			) {
				fetchNextPage();
			}
		};

		scrollElement.addEventListener("scroll", handleScroll);
		return () => scrollElement.removeEventListener("scroll", handleScroll);
	}, [hasNextPage, fetchNextPage, isFetchingNextPage]);

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
						{rowVirtualizer.getVirtualItems().map((virtualItem) => {
							return (
								<div
									key={virtualItem.index}
									className="absolute top-0 left-0 w-full"
									style={{
										height: `${virtualItem.size}px`,
										transform: `translateY(${virtualItem.start}px)`,
									}}
								>
									<PlaylistItem item={flatData[virtualItem.index]} />
								</div>
							);
						})}
					</div>
					{isFetchingNextPage && (
						<div className="p-2 text-center">Loading more...</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Playlists;

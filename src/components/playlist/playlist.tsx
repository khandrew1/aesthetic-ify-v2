"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { PlaylistItemType } from "@/types/playlist";
import { Button } from "@/components/ui/button";

const Playlist = () => {
	const params = useParams();
	const [playlist, setPlaylist] = useState<PlaylistItemType | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPlaylistDetails = async () => {
			try {
				const res = await fetch(`/api/playlists/${params.id}`);
				if (!res.ok) throw new Error("Failed to fetch playlist");
				const data = await res.json();
				setPlaylist(data);
			} catch (error) {
				console.error("Error fetching playlist details: ", error);
			} finally {
				setLoading(false);
			}
		};

		if (params.id) {
			fetchPlaylistDetails();
		}
	}, [params.id]);

	if (loading) return <div>Loading...</div>;
	if (!playlist) return <div>Playlist not found</div>;

	return (
		<div className="container mx-auto h-full p-4 gap-3 justify-center items-center flex flex-col">
			<p className="text-5xl">
				Is this the playlist you would like to{" "}
				<span className="italic">aesthetic-ify</span>?
			</p>
			<div className="flex gap-6 p-4 bg-muted">
				<Image
					src={playlist.image || ""}
					height={200}
					width={200}
					alt={playlist.name}
					className="aspect-square h-fit"
				/>
				<div className="flex flex-col justify-center w-full">
					<h1 className="text-5xl font-bold mb-2">{playlist.name}</h1>
					<p className="text-xl mb-4 italic">{playlist.description}</p>
				</div>
			</div>
			<Link href={`/generate/${params.id}`}>
				<Button className="hover:cursor-pointer">
					<span className="italic font-bold">aesthetic-ify</span>
				</Button>
			</Link>
		</div>
	);
};

export default Playlist;

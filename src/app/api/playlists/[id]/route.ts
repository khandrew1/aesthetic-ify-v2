import { auth } from "@/auth";
import type { PlaylistItemType } from "@/types/playlist";

export async function GET(
	_req: Request,
	{ params }: { params: { id: string } },
) {
	const session = await auth();

	const { id } = params;

	console.log(params);

	try {
		const res = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
			method: "GET",
			headers: { Authorization: `Bearer ${session?.accessToken}` },
		});

		if (!res.ok) {
			return new Response("Failed to fetch playlist", { status: res.status });
		}

		const playlistData = await res.json();

		// Transform to match PlaylistItemType
		const playlist: PlaylistItemType = {
			description: playlistData.description,
			href: playlistData.href,
			id: playlistData.id,
			image: playlistData.images[0]?.url || "",
			name: playlistData.name,
			tracks: playlistData.tracks,
			url: playlistData.external_urls.spotify,
		};

		return Response.json(playlist);
	} catch (error) {
		console.error("Error fetching playlist:", error);
		return new Response("Error fetching playlist", { status: 500 });
	}
}

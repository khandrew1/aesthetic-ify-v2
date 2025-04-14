import { auth } from "@/auth";

import type { SpotifyPlaylistType } from "@/types/playlist";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	const session = await auth();

	const last = req.nextUrl.searchParams.get("last");

	const res = await fetch(
		`https://api.spotify.com/v1/me/playlists?limit=3&offset=${last}`,
		{
			method: "GET",
			headers: { Authorization: `Bearer ${session?.accessToken}` },
		},
	);

	if (!res.ok) {
		return new Response("Failed to fetch playlists", { status: 500 });
	}

	const playlists = await res.json();

	// clean playlists
	playlists.items = playlists.items.map((item: SpotifyPlaylistType) => ({
		description: item.description,
		href: item.href,
		id: item.id,
		image: item.images[0]?.url,
		name: item.name,
		tracks: item.tracks,
		url: item.external_urls.spotify,
	}));

	console.log(playlists.next);

	const nextPage =
		playlists.next === null ? undefined : playlists.offset + playlists.limit;

	return Response.json({ next: nextPage, res: playlists });
}

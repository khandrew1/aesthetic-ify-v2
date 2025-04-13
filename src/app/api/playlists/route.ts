import { auth } from "@/auth";

export async function GET() {
	const session = await auth();

	console.log(session);

	const res = await fetch("https://api.spotify.com/v1/me/playlists?limit=15", {
		method: "GET",
		headers: { Authorization: `Bearer ${session?.accessToken}` },
	});

	if (!res.ok) {
		return new Response("Failed to fetch playlists", { status: 500 });
	}

	const playlists = await res.json();

	// console.log(playlists);

	// clean playlists
	playlists.items = playlists.items.map((item) => ({
		description: item.description,
		href: item.href,
		id: item.id,
		image: item.images[0]?.url,
		name: item.name,
		tracks: item.tracks,
	}));

	console.log(playlists.items);

	return Response.json({ playlists });
}

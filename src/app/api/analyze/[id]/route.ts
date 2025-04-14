import { auth } from "@/auth";

export async function GET(
	_req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	await auth();

	const { id } = await params;

	try {
		const res = await fetch(`http://127.0.0.1:8000/analyze?playlist_id=${id}`, {
			method: "GET",
		});

		if (!res.ok) {
			return new Response("Failed to fetch playlist", { status: res.status });
		}

		const moodData = await res.json();

		return Response.json(moodData);
	} catch (error) {
		console.error("Error fetching playlist:", error);
		return new Response("Error fetching playlist", { status: 500 });
	}
}

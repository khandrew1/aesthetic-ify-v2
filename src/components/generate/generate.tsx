"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

type AnalyzeAPIResponse = {
	mood: string;
	image_prompt: string;
	image_base64: string;
	metadata: string;
};

const Generate = () => {
	const params = useParams();
	const [response, setResponse] = useState<AnalyzeAPIResponse>();
	const [loading, setLoading] = useState(true);

	const fetchMood = async () => {
		try {
			const res = await fetch(`/api/analyze/${params.id}`);
			if (!res.ok) throw new Error("Failed to fetch mood");
			const data = await res.json();
			setResponse(data);
			console.log(data);
		} catch (error) {
			console.error("Error fetching mood: ", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchMood();
	}, []);

	if (loading) return <div>Loading...</div>;

	return (
		<div className="flex flex-col items-center justify-center h-full gap-5">
			<p className="font-bold text-3xl">Here&apos;s your new playlist art!</p>
			<Image
				src={`data:image/png;base64,${response?.image_base64}`}
				height={512}
				width={512}
				alt="aesthetic-ify"
			/>
		</div>
	);
};

export default Generate;

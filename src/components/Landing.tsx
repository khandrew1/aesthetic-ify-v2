import { Button } from "./ui/button";
import { BsSpotify } from "react-icons/bs";

import { signIn } from "@/auth";

const Landing = () => {
	return (
		<div className="flex flex-col items-center justify-center w-full gap-y-4 h-full">
			<p className="text-3xl italic font-bold">aesthetic-ify</p>
			<form
				action={async () => {
					"use server";
					await signIn("spotify", { redirectTo: "/profile" });
				}}
			>
				<Button type="submit" className="flex hover:cursor-pointer">
					<BsSpotify className="text-9xl" />
					Log in with Spotify
				</Button>
			</form>
			<p className="text-xs italic font-semibold">v2.0.0</p>
		</div>
	);
};

export default Landing;

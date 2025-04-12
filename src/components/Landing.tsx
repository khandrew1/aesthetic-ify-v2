import { Button } from "./ui/button";
import { BsSpotify } from "react-icons/bs";

const Landing = () => {
	return (
		<div className="flex flex-col items-center justify-center w-full gap-y-4 h-full">
			<p className="text-3xl text-white italic font-bold">aesthetic-ify v2</p>
			<Button className="flex hover:cursor-pointer">
				<BsSpotify className="text-9xl" />
				Log in with Spotify
			</Button>
		</div>
	);
};

export default Landing;

import Image from "next/image";

import type { User } from "next-auth";

const ProfileCard = ({ profile }: { profile: User }) => {
	return (
		<div className="flex w-1/4 items-center justify-center">
			<div className="flex items-center">
				<Image
					src={profile.image || ""}
					alt={`${profile.name}'s profile picture`}
					width={100}
					height={100}
					className="rounded-full"
				/>
			</div>
			<div className="flex flex-col ml-3 h-full items-center justify-center">
				<p className="font-bold text-3xl">Welcome {profile.name}</p>
				<p className="text-sm">
					Which playlist would you like to{" "}
					<span className="italic">aesthetic-ify</span> today?
				</p>
			</div>
		</div>
	);
};

export default ProfileCard;

import ProfileCard from "./profile-card";

import { auth } from "@/auth";
import SignOut from "./sign-out";
import Playlists from "./playlists";

const Profile = async () => {
	const session = await auth();

	if (!session) {
		return <div>Not authenticated.</div>;
	}

	if (!session?.user) return null;

	return (
		<div className="flex flex-col h-full gap-3 justify-center items-center border-4">
			<ProfileCard profile={session?.user} />
			<Playlists />
			<div className="flex w-1/4 justify-end">
				<SignOut />
			</div>
		</div>
	);
};

export default Profile;

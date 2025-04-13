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

	// console.log(session?.user);

	return (
		<div>
			<ProfileCard profile={session?.user} />
			<Playlists />
			<SignOut />
		</div>
	);
};

export default Profile;

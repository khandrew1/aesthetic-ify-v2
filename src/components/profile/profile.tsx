import { auth } from "@/auth";
import { Button } from "@/components/ui/button";

import { signOut } from "@/auth";

const Profile = async () => {
	const session = await auth();

	if (!session) {
		return <div>Not authenticated.</div>;
	}

	return (
		<form
			action={async () => {
				"use server";
				await signOut({ redirectTo: "/" });
			}}
		>
			<Button type="submit" className="hover:cursor-pointer">
				Sign out
			</Button>
		</form>
	);
};

export default Profile;

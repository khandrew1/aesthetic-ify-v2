import { Button } from "@/components/ui/button";

import { signOut } from "@/auth";

const SignOut = async () => {
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

export default SignOut;

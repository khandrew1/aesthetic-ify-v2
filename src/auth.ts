import NextAuth, { type DefaultSession } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";
import Spotify from "next-auth/providers/spotify";

declare module "next-auth" {
	interface Session extends DefaultSession {
		accessToken?: string;
	}

	interface JWT extends DefaultJWT {
		accessToken?: string;
	}
}

export const { handlers, auth, signIn, signOut } = NextAuth({
	providers: [
		Spotify({
			profile(profile) {
				return {
					name: profile.display_name,
					email: profile.email,
					image: profile.images?.[0]?.url,
				};
			},
		}),
	],
	pages: {
		signIn: "/",
	},
	callbacks: {
		async redirect({ url }) {
			return url;
		},
		async jwt({ token, account }) {
			if (account) {
				token.accessToken = account.access_token;
			}
			return token;
		},
		async session({ session, token }) {
			session.accessToken = token.accessToken;

			return session;
		},
	},
});

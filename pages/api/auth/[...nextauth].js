import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { AESEncrypt } from "utils/encrypt";

export default NextAuth({
  secret: process.env.NEXT_PUBLIC_API_SECRET,
  debug: false,
  session: {
    jwt: true,
  },
  pages: {
    error: "/",
  },
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        private_access_token: {
          label: "Private Access Token",
          type: "password",
          placeholder: "Private Access Token",
        },
      },
      async authorize(credentials, req) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASEURL}/api/v4/user`,
          {
            method: "GET",
            headers: new Headers({
              Authorization: `Bearer ${credentials.private_access_token}`,
              "Content-Type": "application/json",
            }),
          },
        );
        const user = await response.json();
        if (response.ok && user) {
          user.accessToken = credentials.private_access_token;
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt(token, user) {
      if (user) {
        const encryptToken = AESEncrypt(user.accessToken);
        token.access_token = encryptToken;
      }
      return token;
    },
    async session(session) {
      if (!session.user.image) {
        const formatName = session.user.name.split(" ").join("+");
        session.user.image = `${process.env.NEXT_PUBLIC_API_DEFAULT_AVATAR}&name=${formatName}`;
      }
      return session;
    },
  },
});

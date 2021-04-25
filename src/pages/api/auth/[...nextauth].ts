import { Collection, Create, Get, Index, Match } from "faunadb";
import Auth from "next-auth";
import Providers from "next-auth/providers";
import { User } from "types/User";
import { client } from "@lib/faunadb";

const clientId = process.env.GH_CLIENT_ID;
const clientSecret = process.env.GH_CLIENT_SECRET;
const jwtSecret = process.env.JWT_SECRET;

if (!clientId) {
  throw new Error("'GH_CLIENT_ID' cannot be undefined");
}

if (!clientSecret) {
  throw new Error("'GH_CLIENT_SECRET' cannot be undefined");
}

if (!jwtSecret) {
  throw new Error("'JWT_SECRET' cannot be undefined");
}

export default Auth({
  providers: [
    Providers.GitHub({
      clientId,
      clientSecret,
      scope: "user",
    }),
  ],
  useSecureCookies: process.env.NODE_ENV === "production",
  jwt: {
    encryption: true,
    secret: jwtSecret,
  },
  debug: false,
  theme: "dark",
  callbacks: {
    signIn: async (user) => {
      // try find the user
      let foundUser: { data: User | null } = await client
        .query(Get(Match(Index("get_user_by_name"), user.name)))
        .catch(() => null);

      // create a new user if the user was not found
      if (!foundUser?.data) {
        foundUser = await client.query(
          Create(Collection("users"), {
            data: {
              image: user.image,
              name: user.name,
            },
          }),
        );
      }

      if (foundUser) {
        return true;
      } else {
        return false;
      }
    },
  },
});

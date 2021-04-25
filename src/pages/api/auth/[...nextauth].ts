import { Collection, Create, Get, Index, Match, Ref, Update } from "faunadb";
import Auth from "next-auth";
import Providers from "next-auth/providers";
import { User } from "types/User";
import { client } from "@lib/faunadb";
import { QueryData } from "types/Query";

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
    signIn: async (user, _, profile) => {
      // TODO: redirect to error page with ?error=
      if (!user.name) {
        return false;
      }

      // try find the user
      let foundUser = await client
        .query<QueryData<User>>(Get(Match(Index("get_user_by_name"), user.name)))
        .catch(() => null);

      // create a new user if the user was not found
      if (!foundUser?.data) {
        foundUser = await client.query(
          Create(Collection("users"), {
            data: {
              image: user.image,
              name: user.name,
              login: profile.login,
            },
          }),
        );
      }

      if (!foundUser?.data?.login) {
        await client.query(
          Update(Ref(foundUser!.ref), {
            data: {
              login: profile.login,
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

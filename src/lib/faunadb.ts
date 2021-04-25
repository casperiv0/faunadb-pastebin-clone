import { Client } from "faunadb";

if (!process.env.FAUNA_KEY) {
  throw new Error("`FAUNA_KEY` is required!");
}

export const client = new Client({ secret: process.env.FAUNA_KEY });

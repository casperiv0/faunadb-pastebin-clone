import cors from "cors";

export const Cors = cors({
  origin: process.env.NEXT_PUBLIC_PROD_URL,
  credentials: true,
});

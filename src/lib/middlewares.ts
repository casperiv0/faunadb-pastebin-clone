import cors from "cors";
import csurf from "csurf";

export const Cors = cors({
  origin: process.env.NEXT_PUBLIC_PROD_URL,
  credentials: true,
});
export const Csurf = csurf({
  cookie: true,
});

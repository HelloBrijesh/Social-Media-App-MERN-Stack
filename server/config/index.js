import dotenv from "dotenv";
dotenv.config();
export const { PORT, DB_URL, ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } = process.env;

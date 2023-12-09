import dotenv from "dotenv";

dotenv.config();

export const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;
export const JWT_ACCESS_TOKEN_EXPIRES_IN = "1h";
export const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET;
export const JWT_REFRESH_TOKEN_EXPIRES_IN = "1d";

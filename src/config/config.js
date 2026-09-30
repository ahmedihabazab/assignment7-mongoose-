import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.resolve("src\\.env.dev") });

export const PORT = Number(process.env.PORT) || 3000;
export const DBURI = process.env.DBURI;

import dotenv from "dotenv";
import { validateEnv } from "./utils/validate-env";

dotenv.config();

export const { PORT, SPREADSHEET_ID, GOOGLE_API_KEY } = validateEnv();

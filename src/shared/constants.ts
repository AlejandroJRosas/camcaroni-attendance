import dotenv from "dotenv";
import { validateEnv } from "../utils/validate-env";

dotenv.config();

export const { PORT, SPREADSHEET_ID, GOOGLE_API_KEY, SHEET_NAME } =
	validateEnv();

export const PARTICIPATION_DAY_1 = 14;
export const PARTICIPATION_DAY_2 = 15;
export const PARTICIPATION_DAY_3 = 16;

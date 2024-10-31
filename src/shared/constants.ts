import dotenv from "dotenv";
import { validateEnv } from "../utils/validate-env";

dotenv.config();

export const { PORT, SPREADSHEET_ID, GOOGLE_API_KEY, SHEET_NAME } =
	validateEnv();

export const FIRST_DAY_EVENT = {
	date: 14,
	row: "J",
};

export const SECOND_DAY_EVENT = {
	date: 15,
	row: "K",
};

export const THIRD_DAY_EVENT = {
	date: 16,
	row: "L",
};

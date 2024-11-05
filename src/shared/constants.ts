import dotenv from "dotenv";
import { validateEnv } from "../utils/validate-env";

dotenv.config();

export const { PORT, SPREADSHEET_ID, GOOGLE_API_KEY, SHEET_NAME } =
	validateEnv();

export const FIRST_DAY_EVENT = {
	date: 5,
	row: "I",
};

export const SECOND_DAY_EVENT = {
	date: 15,
	row: "J",
};

export const THIRD_DAY_EVENT = {
	date: 16,
	row: "K",
};

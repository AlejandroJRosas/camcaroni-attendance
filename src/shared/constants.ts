import dotenv from "dotenv";
import { validateEnv } from "../utils/validate-env";

dotenv.config();

export const { PORT, SPREADSHEET_ID, GOOGLE_API_KEY, SHEET_NAME } =
	validateEnv();

export const FIRST_DAY_EVENT = {
	date: 1,
	row: "J",
};

export const SECOND_DAY_EVENT = {
	date: 2,
	row: "K",
};

export const THIRD_DAY_EVENT = {
	date: 3,
	row: "L",
};

import { cleanEnv, port } from "envalid";
import { notEmptyStr } from "./not-empty-st";

export const validateEnv = () => {
	return cleanEnv(process.env, {
		PORT: port(),
		GOOGLE_API_KEY: notEmptyStr(),
		SPREADSHEET_ID: notEmptyStr(),
		SHEET_ID: notEmptyStr(),
	});
};

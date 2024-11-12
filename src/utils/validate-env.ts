import { cleanEnv, port } from "envalid";
import { notEmptyStr } from "./not-empty-st";
import { PERMISSION_KEY } from "src/shared/constants";

export const validateEnv = () => {
	return cleanEnv(process.env, {
		PORT: port(),
		GOOGLE_API_KEY: notEmptyStr(),
		SPREADSHEET_ID: notEmptyStr(),
		SHEET_NAME: notEmptyStr(),
		PERMISSION_KEY: notEmptyStr(),
	});
};

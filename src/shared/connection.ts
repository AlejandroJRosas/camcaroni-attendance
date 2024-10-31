// @ts-ignore
import { Auth } from "googleapis";

export const auth = new Auth.GoogleAuth({
	keyFile: "credentials.json",
	scopes: "https://www.googleapis.com/auth/spreadsheets",
});

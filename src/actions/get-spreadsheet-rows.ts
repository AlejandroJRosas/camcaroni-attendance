import { Auth, sheets_v4 } from "googleapis";
import { SHEET_NAME, SPREADSHEET_ID } from "../shared/constants";
import { Participation, SheetRow } from "../shared/types/row.type";

export async function getSpreadsheetRows(): Promise<SheetRow[]> {
	const auth = new Auth.GoogleAuth({
		keyFile: "credentials.json",
		scopes: "https://www.googleapis.com/auth/spreadsheets",
	});

	const client = await auth.getClient();

	const googleSheets = new sheets_v4.Sheets({
		auth: client as Auth.OAuth2Client,
	});

	const getRows = await googleSheets.spreadsheets.values.get({
		auth,
		spreadsheetId: SPREADSHEET_ID,
		range: SHEET_NAME,
	});

	if (!getRows.data.values) {
		return [];
	}

	const rows: SheetRow[] = getRows.data.values.slice(1).map((row) => ({
		registeredAt: row[0],
		name: row[1],
		telephoneNumber: row[2],
		job: row[3],
		area: row[4],
		interests: row[5],
		email: row[7],
		raffleCode: row[8],
		participation: row.slice(9) as [
			Participation,
			Participation,
			Participation
		],
	}));

	return rows;
}

// await googleSheets.spreadsheets.values.update({
//   auth,
//   spreadsheetId: SPREADSHEET_ID,
//   range: SHEET_NAME,
// });

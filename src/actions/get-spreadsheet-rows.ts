// @ts-ignore
import type { Auth } from "googleapis";
// @ts-ignore
import { sheets_v4 } from "googleapis";
import {
	FIRST_DAY_EVENT,
	SECOND_DAY_EVENT,
	SHEET_NAME,
	SPREADSHEET_ID,
	THIRD_DAY_EVENT,
} from "../shared/constants";
import type { Participation, SheetRow } from "../shared/types/row.type";
import { auth } from "../shared/connection";

export async function execute(id: string) {
	const googleSheets = await connectToGoogleSheets();

	const rows = await getSpreadsheetRows(googleSheets);

	const targetRow = await findByRowId(id, rows);

	if (!targetRow) {
		return null;
	}

	const day = getParticipationDay();

	if (!day) {
		return targetRow;
	}

	await updateAttendance(targetRow.rowNumber.toString(), googleSheets, day);

	const updatedRows = await getSpreadsheetRows(googleSheets);
	const updatedTargetRow = await findByRowId(id, updatedRows);

	return updatedTargetRow;
}

export async function connectToGoogleSheets() {
	const client = await auth.getClient();

	const googleSheets = new sheets_v4.Sheets({
		auth: client as Auth.OAuth2Client,
	});

	return googleSheets;
}

export async function getSpreadsheetRows(
	googleSheets: sheets_v4.Sheets
): Promise<SheetRow[]> {
	const getRows = await googleSheets.spreadsheets.values.get({
		auth,
		spreadsheetId: SPREADSHEET_ID,
		range: SHEET_NAME,
	});

	if (!getRows.data.values) {
		return [];
	}

	const rows: SheetRow[] = getRows.data.values
		.slice(1)
		.map((row, index: number) => ({
			rowNumber: index + 2,
			registeredAt: row[0],
			email: row[1],
			name: row[2],
			telephoneNumber: row[3],
			job: row[4],
			area: row[5],
			interests: row[6],
			raffleCode: row[7],
			participation: row.slice(8, 11) as [
				Participation,
				Participation,
				Participation
			],
		}));

	return rows;
}

async function findByRowId(
	id: string,
	rows: SheetRow[]
): Promise<SheetRow | undefined> {
	return rows.find((row) => row.raffleCode === id);
}

function getParticipationDay(): string | null {
	const currentDay = new Date().getDate();

	if (currentDay === FIRST_DAY_EVENT.date) {
		return FIRST_DAY_EVENT.row;
	}
	if (currentDay === SECOND_DAY_EVENT.date) {
		return SECOND_DAY_EVENT.row;
	}
	if (currentDay === THIRD_DAY_EVENT.date) {
		return THIRD_DAY_EVENT.row;
	}

	return null;
}

export async function updateAttendance(
	affectedRowNumber: string,
	googleSheets: sheets_v4.Sheets,
	participationDay: string
) {
	await googleSheets.spreadsheets.values.update({
		spreadsheetId: SPREADSHEET_ID,
		range: `${SHEET_NAME}!${participationDay}${affectedRowNumber}`,
		valueInputOption: "USER_ENTERED",
		requestBody: {
			values: [[true]],
		},
	});
}

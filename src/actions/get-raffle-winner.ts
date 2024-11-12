import { SheetRow } from "src/shared/types/row.type";
import {
	connectToGoogleSheets,
	getSpreadsheetRows,
} from "./get-spreadsheet-rows";

export async function getRaffleWinner(day: number) {
	const googleSheets = await connectToGoogleSheets();

	const rows = await getSpreadsheetRows(googleSheets);

	const participants = getDayParticipants(rows, day);

	return getRandomParticipant(participants);
}

function getDayParticipants(rows: SheetRow[], day: number) {
	let participants: SheetRow[] = [];

	if (day === 14) {
		participants = rows.filter((row) => row.participation[0] === "TRUE");
	}
	if (day === 15) {
		participants = rows.filter((row) => row.participation[1] === "TRUE");
	}
	if (day === 16) {
		participants = rows.filter((row) => row.participation[2] === "TRUE");
	}

	return participants;
}

function getRandomParticipant(participants: SheetRow[]) {
	const randomIndex = Math.floor(Math.random() * participants.length);

	return participants[randomIndex];
}

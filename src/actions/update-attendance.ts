import { SheetRow } from "../shared/types/row.type";
import { findById } from "./find-by-id";

export async function updateAttendance(
	id: string
): Promise<SheetRow | undefined> {
	const row = await findById(id);

	if (!row) {
		return;
	}

	console.log(new Date().getDay);

	// TODO: Update the attendance on the sheet
	row.participation[0] = true;

	return row;
}

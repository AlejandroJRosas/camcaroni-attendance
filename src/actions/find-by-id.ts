import { SheetRow } from "../shared/types/row.type";
import { getSpreadsheetRows } from "./get-spreadsheet-rows";

export async function findById(id: string): Promise<SheetRow | undefined> {
	const rows = await getSpreadsheetRows();

	return rows.find((row) => row.raffleCode === id);
}

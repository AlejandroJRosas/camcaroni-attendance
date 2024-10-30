import { Request, Response, Router } from "express";
import { updateAttendance } from "./actions/update-attendance";

export const router = Router();

// Test endpoint
router.get("/", (_req, res) => {
	res.status(418).json({ test: "Server online!" });
});

// Attendance endpoint
router.get("/asistencia", action);

async function action(req: Request, res: Response) {
	const { id } = req.query;

	if (!id) {
		res.status(400).json({ error: "Missing id" });
		return;
	}

	const response = await updateAttendance(String(id));

	if (!response) {
		res.status(404).json({ error: "Not found" });
		return;
	}

	res.status(200).json(response);
}

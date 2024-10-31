import { Router } from "express";
import type { Request, Response } from "express";
import { execute } from "./actions/get-spreadsheet-rows";

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

	const response = await execute(String(id));

	if (!response) {
		res.status(404).json({ error: "Not found" });
		return;
	}

	res.status(200).render("attendance", response);
}

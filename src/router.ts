import { Router } from "express";
import type { Request, Response } from "express";
import { execute } from "./actions/get-spreadsheet-rows";
import path from "node:path";

export const router = Router();

// Test endpoint
router.get("/", (_req, res) => {
	res.status(418).json({ test: "Server online!" });
});

// Attendance endpoint
router.get("/asistencia", action);

router.get("/images/camcaroni-registro", image);

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

function image(_req: Request, res: Response) {
	const imagePath = path.join(
		process.cwd(),
		"public/images/camcaroni-registro.png"
	);

	res.sendFile(imagePath);
}

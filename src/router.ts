import { Router } from "express";
import type { Request, Response } from "express";
import { execute } from "./actions/get-spreadsheet-rows";
import path from "node:path";
import { getRaffleWinner } from "./actions/get-raffle-winner";

export const router = Router();

// Test endpoint
router.get("/", (_req, res) => {
	res.status(418).json({ test: "Server online!" });
});

// Attendance endpoint
router.get("/asistencia", action);

// Raffle endpoint
router.get("/sorteo", raffle);

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

async function raffle(req: Request, res: Response) {
	const { day } = req.query;

	if (!day) {
		res.status(400).render("select-day");
		return;
	}

	const response = await getRaffleWinner(Number(day));

	if (!response) {
		res.status(404).json({ error: "Not found" });
		return;
	}

	res.status(200).render("winner", response);
}

function image(_req: Request, res: Response) {
	const imagePath = path.join(
		process.cwd(),
		"public/images/camcaroni-registro.png"
	);

	res.sendFile(imagePath);
}

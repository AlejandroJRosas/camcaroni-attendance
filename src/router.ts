import { Request, Response, Router } from "express";

export const router = Router();

// Test endpoint
router.get("/", (_req, res) => {
	res.status(418).json({ test: "Server online!" });
});

router.get("/asistencia", action);

async function action(req: Request, res: Response) {
	const { id } = req.query;

	if (!id) {
		res.status(400).json({ error: "Missing id" });
		return;
	}

	res.status(200).json({ asistencia: `Ok ${id}` });
}

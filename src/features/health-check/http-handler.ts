import type { Request, Response } from "express";

export const getHealthCheck = async (req: Request, res: Response) => {
	res.status(200).json({
		status: "okay",
	});
};

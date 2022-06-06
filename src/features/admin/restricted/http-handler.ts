import type { Request, Response } from "express";

export const getRestrictedContent = async (req: Request, res: Response) => {
	res.status(200).json({
		result: "This is a restricted content",
	});
};

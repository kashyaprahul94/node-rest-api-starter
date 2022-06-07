import type { Request, Response } from "express";

import { getRestrictedContentData } from "./service";

export const getRestrictedContent = async (req: Request, res: Response) => {
	const result = await getRestrictedContentData();

	res.status(200).json(result);
};

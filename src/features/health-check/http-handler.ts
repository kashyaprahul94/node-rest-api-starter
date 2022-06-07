import type { Request, Response } from "express";

import { getHealthCheckMetrics } from "./service";

export const getHealthCheck = async (req: Request, res: Response) => {
	const healthMetrics = await getHealthCheckMetrics();

	res.status(200).json({
		status: "okay",
		...healthMetrics,
	});
};

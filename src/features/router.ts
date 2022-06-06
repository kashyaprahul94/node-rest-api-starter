import type { Request, Response } from "express";

import express from "express";

import { prepareRoutes as prepareHealthCheckRoutes } from "./health-check/routes";

export const getRouter = () => {
	const router = express.Router();

	router.all("/", (_: Request, res: Response) => {
		res.status(200).json({
			message: "Welcome to the REST API",
		});
	});

	prepareHealthCheckRoutes(router);

	return router;
};

import type { IRouter } from "express";

import express from "express";

import { getHealthCheck } from "./http-handler";

export const prepareRoutes = (parentRouter: IRouter) => {
	const router = express.Router();

	router.get("/", getHealthCheck);

	parentRouter.use("/health-check", router);
};

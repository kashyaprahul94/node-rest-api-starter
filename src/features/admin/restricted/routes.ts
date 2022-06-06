import type { IRouter } from "express";

import express from "express";

import { getRestrictedContent } from "./http-handler";

export const prepareRoutes = (parentRouter: IRouter) => {
	const router = express.Router();

	router.get("/", getRestrictedContent);

	parentRouter.use("/restricted", router);
};

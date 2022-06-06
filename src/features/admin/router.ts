import express from "express";

import { prepareRoutes as prepareRestrictedRoutes } from "./restricted/routes";

export const getRouter = () => {
	const router = express.Router();

	prepareRestrictedRoutes(router);

	return router;
};

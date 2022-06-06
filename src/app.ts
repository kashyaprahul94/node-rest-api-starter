import Config from "@/config";

import { HttpServer } from "./server";
import { getRouter } from "@/features/router";
import { getRouter as getAdminRouter } from "@/features/admin/router";

const prepareHttpServer = () => {
	const server = new HttpServer({
		port: Config.HTTP_PORT,
		onServerStarted: (port: number) => {
			console.info(`> Server has been started at http://localhost:${port}`);
		},
	});

	server.attachRouter(getRouter());
	server.attachRouter(getAdminRouter(), "/admin");

	return server;
};

export const boot = async () => {
	const httpServer = prepareHttpServer();

	httpServer.boot();
};

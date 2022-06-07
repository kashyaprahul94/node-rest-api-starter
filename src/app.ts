import Config from "@/config";

import { clusterClient as redisClusterClient } from "@/core/persistence/redis";

import { getRouter } from "@/features/router";
import { getRouter as getAdminRouter } from "@/features/admin/router";

import { HttpServer } from "./server";

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

const prepareRedis = async () => {
	redisClusterClient.init({
		host: Config.REDIS.HOST,
		port: Config.REDIS.PORT,
	});

	return redisClusterClient.onceReady();
};

const preparePersistence = async () => {
	await prepareRedis().then(() => console.info("Connected to Redis!"));
};

export const boot = async () => {
	await preparePersistence();

	const httpServer = prepareHttpServer();

	httpServer.boot();
};

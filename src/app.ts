import Config from "@/config";

import { clusterClient as redisClusterClient } from "@/core/persistence/redis";
import { poolClient as mysqlPoolClient } from "@/core/persistence/mysql";
import { HttpServer } from "@/core/server";

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

const prepareRedis = async () => {
	redisClusterClient.init({
		host: Config.REDIS.HOST,
		port: Config.REDIS.PORT,
	});

	return redisClusterClient.onceReady();
};

const prepareMySQL = async () => {
	mysqlPoolClient.init({
		host: Config.MYSQL.PRIMARY.HOST,
		port: Config.MYSQL.PRIMARY.PORT,
		user: Config.MYSQL.PRIMARY.USER,
		password: Config.MYSQL.PRIMARY.PASSWORD,
		dbName: Config.MYSQL.PRIMARY.DB_NAME,
	});

	return mysqlPoolClient.onceReady();
};

const preparePersistence = async () => {
	await Promise.all([
		prepareRedis().then(() => console.info("Connected to Redis!")),
		prepareMySQL().then(() => console.info("Connected to MySQL!")),
	]);
};

export const boot = async () => {
	await preparePersistence();

	prepareHttpServer().boot();
};

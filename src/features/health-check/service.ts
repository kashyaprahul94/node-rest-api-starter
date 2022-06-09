import { clusterClient as redisClusterClient } from "@/core/persistence/redis";
import { poolClient as mysqlPoolClient } from "@/core/persistence/mysql";
import { client as mongodbClient } from "@/core/persistence/mongodb";

const getRedisHealth = async () => {
	const redisInfo = await redisClusterClient.getClient().info();

	if (redisInfo) {
		return "healthy";
	}

	return "not healthy!";
};

const getMySQLHealth = async () => {
	return new Promise((resolve) => {
		mysqlPoolClient.getConnection().then((connection) => {
			connection.ping(null, (err: any) => {
				if (!err) {
					return resolve("healthy");
				}

				resolve("not healthy!");
			});
			mysqlPoolClient.releaseConnection(connection);
		});
	});
};

const getMongoDBHealth = async () => {
	const { db, close } = await mongodbClient.getDb("en");

	if (db) {
		await close();
		return "healthy";
	}

	return "not healthy!";
};

export const getHealthCheckMetrics = async () => {
	const redisHealthPromise = getRedisHealth();
	const mysqlHealthPromise = getMySQLHealth();
	const mongodbHealthPromise = getMongoDBHealth();

	const redisHealth = await redisHealthPromise;
	const mysqlHealth = await mysqlHealthPromise;
	const mongodbHealth = await mongodbHealthPromise;

	return {
		services: {
			persistence: {
				redis: redisHealth,
				mysql: mysqlHealth,
				mongodb: mongodbHealth,
			},
		},
	};
};

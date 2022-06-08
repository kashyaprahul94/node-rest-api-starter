import { clusterClient as redisClusterClient } from "@/core/persistence/redis";
import { poolClient as mysqlPoolClient } from "@/core/persistence/mysql";

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

export const getHealthCheckMetrics = async () => {
	const redisHealthPromise = getRedisHealth();
	const mysqlHealthPromise = getMySQLHealth();

	const redisHealth = await redisHealthPromise;
	const mysqlHealth = await mysqlHealthPromise;

	return {
		services: {
			persistence: {
				redis: redisHealth,
				mysql: mysqlHealth,
			},
		},
	};
};

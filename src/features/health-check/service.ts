import { clusterClient as redisClusterClient } from "@/core/persistence/redis";
import { poolClient as mysqlPoolClient } from "@/core/persistence/mysql";
import { client as mongodbClient } from "@/core/persistence/mongodb";
import { client as elasticSearchClient } from "@/core/persistence/elastic-search";

const getRedisHealth = async () => {
	const redisInfo = redisClusterClient.getClient().status;

	if (redisInfo) {
		return redisInfo;
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
		const stats = await db.stats();

		await close();

		return stats;
	}

	return "not healthy!";
};

const getElasticSearchHealth = async () => {
	const client = elasticSearchClient.getClient();

	const nodeHealth = await client.nodes.stats({});

	if (nodeHealth) {
		return nodeHealth.meta.connection;
	}

	return "not healthy!";
};

export const getHealthCheckMetrics = async () => {
	const redisHealthPromise = getRedisHealth();
	const mysqlHealthPromise = getMySQLHealth();
	const mongodbHealthPromise = getMongoDBHealth();
	const elasticSearchHealthPromise = getElasticSearchHealth();

	const redisHealth = await redisHealthPromise;
	const mysqlHealth = await mysqlHealthPromise;
	const mongodbHealth = await mongodbHealthPromise;
	const elasticSearchHealth = await elasticSearchHealthPromise;

	return {
		services: {
			persistence: {
				redis: redisHealth,
				mysql: mysqlHealth,
				mongodb: mongodbHealth,
				elasticSearch: elasticSearchHealth,
			},
		},
	};
};

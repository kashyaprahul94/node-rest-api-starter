import { clusterClient } from "@/core/persistence/redis";

export const getHealthCheckMetrics = async () => {
	const redisInfo = await clusterClient.getClient().info();

	return {
		services: {
			persistence: {
				redis: redisInfo,
			},
		},
	};
};

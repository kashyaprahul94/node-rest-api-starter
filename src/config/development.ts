import type { EnvConfigType } from "./types";

const config: EnvConfigType = {
	FILES_BUCKET: "/test/",

	REDIS: {
		HOST: process.env.REDIS_CLUSTER_HOST,
		PORT: process.env.REDIS_CLUSTER_PORT,
	},
} as const;

export default config;

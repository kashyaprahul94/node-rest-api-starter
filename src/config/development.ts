import type { EnvConfigType } from "./types";

import { getConfigValue } from "./helper";

const config: EnvConfigType = {
	FILES_BUCKET: "/test/",

	REDIS: {
		HOST: getConfigValue("REDIS__CLUSTER_HOST"),
		PORT: getConfigValue("REDIS__CLUSTER_PORT"),
	},

	MYSQL: {
		PRIMARY: {
			HOST: getConfigValue("MYSQL__PRIMARY_HOST"),
			PORT: getConfigValue("MYSQL__PRIMARY_PORT"),
			USER: getConfigValue("MYSQL__PRIMARY_USER"),
			PASSWORD: getConfigValue("MYSQL__PRIMARY_PASSWORD"),
			DB_NAME: getConfigValue("MYSQL__PRIMARY_DB_NAME"),
		},
		SECONDARY: getConfigValue("MYSQL__SECONDARY_HOST")
			? [
					{
						HOST: getConfigValue("MYSQL__SECONDARY_HOST"),
						PORT: getConfigValue("MYSQL__SECONDARY_PORT"),
						USER: getConfigValue("MYSQL__SECONDARY_USER"),
						PASSWORD: getConfigValue("MYSQL__SECONDARY_PASSWORD"),
						DB_NAME: getConfigValue("MYSQL__SECONDARY_DB_NAME"),
					},
			  ]
			: [],
	},

	MONGO: {
		en: {
			NODES: [getConfigValue("MONGODB__EN_NODE_1")],
			DB_NAME: getConfigValue("MONGODB__EN_DB_NAME"),
			DB_OPTIONS: "",
		},
	},

	ELASTIC_SEARCH: {
		HOST: getConfigValue("ELASTIC_SEARCH__CLUSTER_HOST"),
		PORT: getConfigValue("ELASTIC_SEARCH__CLUSTER_PORT"),
	},
} as const;

export default config;

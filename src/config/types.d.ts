import CommonConfig from "./common";

export type CommonConfigType = typeof CommonConfig;

export type EnvConfigType = {
	readonly FILES_BUCKET: string;

	REDIS: {
		readonly HOST: string;
		readonly PORT: string | number;
	};

	MYSQL: {
		readonly PRIMARY: IMySQLConfig;
		readonly SECONDARY: readonly IMySQLConfig[];
	};

	MONGO: {
		readonly [LANG: string]: {
			readonly NODES: readonly string[];
			readonly DB_NAME: string;
			readonly DB_OPTIONS: string;
		};
	};

	ELASTIC_SEARCH: {
		readonly HOST: string;
		readonly PORT: string | number;
	};
};

export type AppConfigType = CommonConfigType & EnvConfigType;

interface IMySQLConfig {
	readonly HOST: string;
	readonly PORT: string;
	readonly USER: string;
	readonly PASSWORD: string;
	readonly DB_NAME: string;
}

import CommonConfig from "./common";

export type CommonConfigType = typeof CommonConfig;

type SupportedLangs = "en" | "hi";

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

	MONGO: IMongoDBConfig;

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

type IMongoDBConfig = Record<
	SupportedLangs,
	{
		readonly NODES: readonly string[];
		readonly DB_NAME: string;
		readonly DB_OPTIONS: string;
	}
>;

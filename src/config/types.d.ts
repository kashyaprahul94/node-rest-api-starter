import CommonConfig from "./common";

export type CommonConfigType = typeof CommonConfig;
export type EnvConfigType = {
	FILES_BUCKET: string;

	REDIS: {
		HOST: string;
		PORT: string | number;
	};
};

export type AppConfigType = CommonConfigType & EnvConfigType;

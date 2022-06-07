import type { EnvConfigType } from "./types";

const config: EnvConfigType = {
	FILES_BUCKET: "",

	REDIS: {
		HOST: "localhost",
		PORT: "6380",
	},
} as const;

export default config;

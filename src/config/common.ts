import { getConfigValue } from "./helper";

const config = {
	HTTP_PORT: getConfigValue("HTTP_PORT", true),
} as const;

export default config;

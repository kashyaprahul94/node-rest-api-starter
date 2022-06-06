import type { AppConfigType } from "./types";

import CommonConfig from "./common";

const { default: EnvConfig } = require(`./${process.env.CONFIG_ENV}`);

const config: AppConfigType = Object.assign({}, CommonConfig, EnvConfig);

export default config;

import CommonConfig from "./common";
import ProductionConfig from "./production";

export type CommonConfigType = typeof CommonConfig;
export type EnvConfigType = typeof ProductionConfig;

export type AppConfigType = CommonConfigType & EnvConfigType;

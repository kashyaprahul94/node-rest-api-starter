export interface IServerOptions {
	port: number | string;
	onServerStarted: OnServerStartedCallbackType;
}

export type OnServerStartedCallbackType = (port: number) => void;

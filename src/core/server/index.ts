import type {
	Express as ExpressApplication,
	IRouter as ExpressRouter,
} from "express";
import type { IServerOptions, OnServerStartedCallbackType } from "./types";

import express from "express";
import bodyParser from "body-parser";

export class HttpServer {
	private port: number;
	private onServerStarted: OnServerStartedCallbackType;

	private readonly expressInstance: ExpressApplication;

	constructor({ port, onServerStarted }: IServerOptions) {
		this.port = Number(port);
		this.onServerStarted = onServerStarted;

		this.expressInstance = express();

		this.initDefaultMiddlewares();
	}

	public getPort() {
		return this.port;
	}

	private initDefaultMiddlewares() {
		this.expressInstance.use(bodyParser.json({}));
		this.expressInstance.use(
			bodyParser.urlencoded({
				extended: true,
			})
		);
	}

	private ignite() {
		this.expressInstance.listen(
			this.port,
			this.onServerStarted.bind(null, this.port)
		);
	}

	public attachRouter(router: ExpressRouter, mountPoint?: string) {
		if (mountPoint) {
			this.expressInstance.use(mountPoint, router);
			return;
		}

		this.expressInstance.use(router);
	}

	public boot() {
		return this.ignite();
	}
}

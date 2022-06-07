import type { IRedisClientOptions } from "./types";

import { Cluster } from "ioredis";

class RedisClusterClient {
	private client: Cluster;

	public constructor() {}

	public init({ host, port }: IRedisClientOptions) {
		this.client = new Cluster([
			{
				host: host,
				port: Number(port),
			},
		]);
	}

	public onceReady() {
		return new Promise((resolve) => {
			this.client.on("connect", resolve);
		});
	}

	public getClient() {
		return this.client;
	}
}

const client = new RedisClusterClient();

export default client;

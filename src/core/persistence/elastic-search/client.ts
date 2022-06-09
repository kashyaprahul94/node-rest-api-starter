import type { IElasticSearchOptions } from "./types";

import { Client } from "@elastic/elasticsearch";

class ElasticSearchClient {
	private client: Client;

	public constructor() {}

	public init({ node }: IElasticSearchOptions) {
		this.client = new Client({
			node,
		});
	}

	public async onceReady() {
		return true;
	}

	public getClient() {
		return this.client;
	}
}

const client = new ElasticSearchClient();

export default client;

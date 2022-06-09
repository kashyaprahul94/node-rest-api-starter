import type {
	IMongoDBOptions,
	MongDBVariant,
	MongoDBClients,
	MongoDBDatabases,
} from "./types";

import { MongoClient } from "mongodb";

class MongoDBClient {
	private clients: MongoDBClients;
	private dbs: MongoDBDatabases;

	public constructor() {
		this.clients = {
			en: {} as any,
			hi: {} as any,
		};
		this.dbs = {
			en: "",
			hi: "",
		};
	}

	public init({ nodes, options, lang, dbName }: IMongoDBOptions) {
		this.clients[lang] = new MongoClient(
			resolveMongoConnectionString(nodes, options)
		);
		this.dbs[lang] = dbName;
	}

	public async onceReady() {
		return true;
	}

	public getClient(variant: MongDBVariant) {
		return this.clients[variant];
	}

	public async getDb(variant: MongDBVariant) {
		const connection = this.getClient(variant);

		if (!connection) {
			throw new Error(
				`Could not get MongoDB connection for ${variant} variant`
			);
		}

		return {
			db: connection.db(this.dbs[variant]),
			close: () => connection.close(),
		};
	}
}

const resolveMongoConnectionString = (
	nodes: readonly string[],
	options?: string
) => {
	const url = ["mongodb://", nodes.join(",")].join("");

	return [url, options].join("/");
};

const client = new MongoDBClient();

export default client;

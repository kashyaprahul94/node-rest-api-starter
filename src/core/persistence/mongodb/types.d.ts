import type { MongoClient } from "mongodb";

import type { SupportedLangs } from "@/config/types";

export interface IMongoDBOptions {
	lang: SupportedLangs;
	nodes: readonly string[];
	dbName: string;
	options?: string;
}

export type MongDBVariant = SupportedLangs;
export type MongoDBClients = Record<MongDBVariant, MongoClient>;
export type MongoDBDatabases = Record<MongDBVariant, string>;

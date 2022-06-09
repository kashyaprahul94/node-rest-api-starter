import type { IMySQLOptions } from "./types";

import mysql from "mysql";

class MySQLPoolClient {
	private poolClient: mysql.Pool;
	private connectionsInFlight: Record<number, mysql.PoolConnection>;

	public constructor() {}

	public init({ host, port, user, password, dbName }: IMySQLOptions) {
		this.poolClient = mysql.createPool({
			host,
			port: Number(port),
			user,
			password,
			database: dbName,
			connectionLimit: 50,
			charset: "utf8mb4",
			timezone: "Local",
		});

		this.poolClient.on("acquire", (connection) => {
			console.info(
				`[MySQL] A connection ${connection.threadId} has been acquired within the pool`
			);
		});
		this.poolClient.on("release", (connection) => {
			console.info(
				`[MySQL] A connection ${connection.threadId} has been released from the pool`
			);
		});

		this.connectionsInFlight = {};
	}

	public async onceReady() {
		return this.poolClient.listenerCount("acquire") === 1;
	}

	public async getConnection(): Promise<mysql.PoolConnection> {
		return new Promise((resolve, reject) => {
			this.poolClient.getConnection((err, connection) => {
				if (err) {
					return reject(err);
				}

				if (connection.threadId) {
					this.connectionsInFlight[connection.threadId] = connection;
				}

				resolve(connection);
			});
		});
	}

	public async releaseConnection(connection: mysql.PoolConnection) {
		if (connection.threadId) {
			delete this.connectionsInFlight[connection.threadId];
		}

		connection.release();
	}
}

const client = new MySQLPoolClient();

export default client;

import mysql from 'mysql2/promise';
import Schema from './Schema';
import Document from './Document';
import Model from './Model';
export declare type ConnectionParams = {
    /** The hostname of the database you are connecting to. (Default: localhost) */
    host?: string;
    /** The MySQL user to authenticate as */
    user?: string;
    /** The password of that MySQL user */
    password?: string;
    /** Name of the database to use for this connection */
    database?: string;
    /**
     * The milliseconds before a timeout occurs during the connection acquisition. This is slightly different from connectTimeout,
     * because acquiring a pool connection does not always involve making a connection. (Default: 10 seconds)
     */
    acquireTimeout?: number;
    /**
     * Determines the pool's action when no connections are available and the limit has been reached. If true, the pool will queue
     * the connection request and call it when one becomes available. If false, the pool will immediately call back with an error.
     * (Default: true)
     */
    waitForConnections?: boolean;
    /** The maximum number of connections to create at once. (Default: 10) */
    connectionLimit?: number;
    /**
     * The maximum number of connection requests the pool will queue before returning an error from getConnection. If set to 0, there
     * is no limit to the number of queued connection requests. (Default: 0)
     */
    queueLimit?: number;
    /**
     * Enable keep-alive on the socket.  It's disabled by default, but the
     * user can enable it and supply an initial delay.
     */
    enableKeepAlive?: true;
    /** If keep-alive is enabled users can supply an initial delay. */
    keepAliveInitialDelay?: number;
};
declare type ConnectionModel = {
    [model: string]: Model<Document>;
};
declare class Connection {
    /** Database name */
    name: string;
    /** Returns MySQL pool instance */
    db?: mysql.Pool;
    /** Returns models defined through this Connection */
    models: ConnectionModel;
    constructor(props?: ConnectionParams);
    /**  Switches to a different database using the same connection pool. */
    useDb(props: ConnectionParams): this;
    /**
     * Defines or retrieves a model.
     * @param name model and mysql db table name
     * @param schema a schema. necessary when defining a model
     * @returns The compiled model
     */
    model(name: string, schema?: Schema): Model<Document>;
    modelNames(): string[];
    deleteModel(model: string): this;
    dropTable(name: string, callback?: (err: any) => void): Promise<void>;
    dropDatabase(callback?: (err: any) => void): Promise<void>;
    /** Closes the connection */
    close(callback?: (err: any) => void): Promise<void> | void;
}
export default Connection;

import mysql from 'mysql2/promise';
import Schema from './Schema';
import Model from './Model';
export declare type ConnectionParams = {
    host: string;
    user: string;
    password: string;
    database: string;
};
declare type ConnectionModel = {
    [model: string]: Model<any>;
};
declare class Connection {
    name: string;
    db?: mysql.Pool;
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
    model(name: string, schema: Schema): Model<import("./Document").default>;
    modelNames(): string[];
    deleteModel(model: string): this;
    /** Closes the connection */
    close(callback?: (err: any) => void): void;
}
export default Connection;

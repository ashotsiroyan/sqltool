import mysql from 'mysql2/promise';
import Connection, { ConnectionParams } from './Connection';
interface Imysql {
    connection: Connection;
    connections: Connection[];
    connect: (props: ConnectionParams) => Promise<Connection>;
    createConnection: (props: ConnectionParams) => Promise<Connection>;
    escape: (value: any) => string;
    format: (sql: string, values?: any) => string;
    execute: (sql: string, db?: mysql.Pool) => any;
    query: (sql: string, db?: mysql.Pool) => any;
}
declare var Singleton: Imysql;
export default Singleton;

import mysql from 'mysql2/promise';
import Connection from './Connection';
interface Imysql {
    connection: Connection;
    connections: Connection[];
    connect: (props: any) => Connection;
    createConnection: (props: any) => Connection;
    escape: (value: any) => any;
    format: (sql: string, values?: any) => any;
    execute: (sql: string, db?: mysql.Pool) => any;
    query: (sql: string, db?: mysql.Pool) => any;
}
declare var Singleton: Imysql;
export default Singleton;
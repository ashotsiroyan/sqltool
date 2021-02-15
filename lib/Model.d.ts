import Document from './Document';
import DocumentQuery from './DocumentQuery';
import Schema from './Schema';
import Connection from './Connection';
declare type QuerySelector = {
    $eq?: any;
    $gt?: any;
    $gte?: any;
    $in?: string | string[] | number | number[];
    $lt?: any;
    $lte?: any;
    $ne?: any;
    $nin?: string | string[] | number | number[];
};
declare type RootQuerySelector = {
    _id?: string;
    $or?: Array<FilterQuery>;
    $and?: Array<FilterQuery>;
};
declare type FilterQuery = {
    [field: string]: QuerySelector | string | number;
};
export interface DocProps {
    schema: Schema;
    db: Connection;
    modelName: string;
}
interface IModel<T extends Document> {
    new: (doc?: any) => Document;
    find(conditions?: RootQuerySelector | FilterQuery, fields?: string[]): DocumentQuery<T[], T>;
    find(conditions: RootQuerySelector | FilterQuery, fields: string[], callback: (err: any, res?: Document[]) => void): DocumentQuery<T[], T>;
    findOne(conditions?: RootQuerySelector | FilterQuery, fields?: string[]): DocumentQuery<T | null, T>;
    findOne(conditions: RootQuerySelector | FilterQuery, fields: string[], callback: (err: any, res?: Document) => void): DocumentQuery<T | null, T>;
    findById(id: string, fields?: string[]): DocumentQuery<T | null, T>;
    findById(id: string, fields: string[], callback: (err: any, res?: Document) => void): DocumentQuery<T | null, T>;
    insertOne(params: object): Promise<Document>;
    insertOne(params: object, callback: (err: any, res?: Document) => void): void;
    insertMany(params: object[]): Promise<Document[]>;
    insertMany(params: object[], callback: (err: any, res?: Document[]) => void): void;
    update(conditions: RootQuerySelector | FilterQuery, update: any): Promise<any>;
    update(conditions: RootQuerySelector | FilterQuery, update: any, callback: (err: any, raw?: any) => void): void;
    updateById(id: string, update: any): Promise<any>;
    updateById(id: string, update: any, callback: (err: any, raw?: any) => void): void;
    delete(conditions: RootQuerySelector | FilterQuery): Promise<void>;
    delete(conditions: RootQuerySelector | FilterQuery, callback: (err: any) => void): void;
    deleteById(id: string): Promise<void>;
    deleteById(id: string, callback: (err: any) => void): void;
    countDocuments(conditions: RootQuerySelector | FilterQuery): Promise<number>;
    countDocuments(conditions: RootQuerySelector | FilterQuery, callback: (err: any, res?: number) => void): void;
}
declare class Model<T extends Document> implements IModel<T> {
    private docProps;
    readonly schema: Schema;
    readonly db: Connection;
    constructor(name: string, schema: Schema, db: Connection);
    get modelName(): string;
    new(doc?: any): Document;
    find(callback?: (err: any, res?: Document[]) => void): DocumentQuery<T[], T>;
    find(conditions: RootQuerySelector | FilterQuery, callback?: (err: any, res?: Document[]) => void): DocumentQuery<T[], T>;
    find(conditions: RootQuerySelector | FilterQuery, fields?: string[], callback?: (err: any, res?: Document[]) => void): DocumentQuery<T[], T>;
    findOne(callback?: (err: any, res?: Document) => void): DocumentQuery<T | null, T>;
    findOne(conditions: RootQuerySelector | FilterQuery, callback?: (err: any, res?: Document) => void): DocumentQuery<T | null, T>;
    findOne(conditions: RootQuerySelector | FilterQuery, fields?: string[], callback?: (err: any, res?: Document) => void): DocumentQuery<T | null, T>;
    findById(id: string, callback?: (err: any, res?: Document) => void): DocumentQuery<T | null, T>;
    findById(id: string, fields?: string[], callback?: (err: any, res?: Document) => void): DocumentQuery<T | null, T>;
    insertOne(params: object): Promise<Document>;
    insertOne(params: object, callback: (err: any, res?: Document) => void): void;
    insertMany(params: object[]): Promise<Document[]>;
    insertMany(params: object[], callback: (err: any, res?: Document[]) => void): void;
    update(conditions: RootQuerySelector | FilterQuery, update: any): Promise<any>;
    update(conditions: RootQuerySelector | FilterQuery, update: any, callback: (err: any, raw?: any) => void): void;
    updateById(id: string, update: any): Promise<any>;
    updateById(id: string, update: any, callback: (err: any, raw?: any) => void): void;
    delete(conditions?: RootQuerySelector | FilterQuery): Promise<void>;
    delete(conditions: RootQuerySelector | FilterQuery, callback: (err: any) => void): void;
    deleteById(id: string): Promise<void>;
    deleteById(id: string, callback: (err: any) => void): void;
    countDocuments(conditions?: RootQuerySelector | FilterQuery): Promise<number>;
    countDocuments(conditions: RootQuerySelector | FilterQuery, callback: (err: any, res?: number) => void): void;
    private checkDb;
}
export default Model;

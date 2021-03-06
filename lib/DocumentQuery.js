"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("./mysql"));
const Document_1 = __importDefault(require("./Document"));
class DocumentQuery {
    constructor(query, model, isOne) {
        this.mainQuery = "";
        this.skipQuery = "";
        this.sortQuery = "";
        this.limitQuery = "";
        this.mainQuery = query;
        this.isOne = isOne ? isOne : false;
        this.model = model;
    }
    limit(val) {
        if (val) {
            this.limitQuery = " LIMIT " + val;
        }
        return this;
    }
    skip(val) {
        if (val) {
            this.skipQuery = " OFFSET " + val;
        }
        return this;
    }
    sort(arg) {
        if (Object.keys(arg).length > 0) {
            let query = " ORDER BY ";
            Object.keys(arg).forEach((key, i) => {
                query += `${key} ${arg[key] === -1 ? 'DESC' : 'ASC'}${i !== Object.keys(arg).length - 1 ? ', ' : ''}`;
            });
            this.sortQuery = query;
        }
        return this;
    }
    exec(callback) {
        let { mainQuery, limitQuery, sortQuery, skipQuery } = this;
        try {
            let query = mainQuery + sortQuery + limitQuery + (limitQuery.trim() !== '' ? skipQuery : '');

                return mysql_1.default.execute(query, this.model.db.db)
                    .then(([rows]) => {
                    rows = rows.map((row) => {
                        return new Document_1.default(Object.assign({ doc: row }, this.model));
                    });
                    let res;
                    if (!this.isOne)
                        res = rows;
                    else
                        res = rows[0] ? rows[0] : null;
                    if (callback)
                        callback(null, res);
                    else
                        return res;
                })
                    .catch((err) => {
                    throw err;
                });

        }
        catch (err) {
            if (callback)
                callback(err);
            else
                throw err;
        }
    }
}
exports.default = DocumentQuery;

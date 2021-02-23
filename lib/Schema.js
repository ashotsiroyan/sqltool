"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataTypes_1 = require("./plugins/dataTypes");
class Schema {
    constructor(definition, options) {
        this.indexes = {};
        this.obj = definition;
        this.options = options;
        this.methods = {};
        const hasId = this.options._id === undefined || this.options._id ? true : false;
        if (hasId)
            this.obj = Object.assign({ _id: { type: 'VARCHAR', size: 24, primaryKey: true } }, this.obj);
        if (this.options.timestamps)
            this.obj = Object.assign(Object.assign({}, this.obj), { _createdAt: { type: 'DATE', default: new Date() }, _updatedAt: { type: 'DATE', default: new Date() } });
    }
    get query() {
        return this.convertToString();
    }
    pre(method, callBack) {
        this.methods[method] = callBack;
    }
    remove(field) {
        delete this.obj[field];
    }
    index(fields) {
        const exists = (name) => {
            let is = false;
            Object.keys(this.indexes).forEach((key) => {
                if (name === key) {
                    is = true;
                    return true;
                }
            });
            return is;
        };
        Object.keys(fields).forEach((key) => {
            if (this.obj[key] !== undefined) {
                if (!exists(fields[key])) {
                    this.indexes[fields[key]] = [key];
                }
                else {
                    this.indexes[fields[key]].push(key);
                }
            }
        });
    }
    convertToString() {
        const hasId = this.options._id === undefined || this.options._id ? true : false;
        let mysql = "", indexSql = "";
        Object.keys(this.obj).forEach((field, i) => {
            let option = this.obj[field];
            mysql += `${field} `;
            if (typeof option !== 'string') {
                let size = "";
                if (option.size) {
                    if (dataTypes_1.dataTypesOptions[option.type].min !== null && option.size > dataTypes_1.dataTypesOptions[option.type].min)
                        size = `(${option.size})`;
                    else if (dataTypes_1.dataTypesOptions[option.type].min)
                        size = `(${dataTypes_1.dataTypesOptions[option.type].min})`;
                    if (dataTypes_1.dataTypesOptions[option.type].max !== null && option.size < dataTypes_1.dataTypesOptions[option.type].max)
                        size = `(${option.size})`;
                    else if (dataTypes_1.dataTypesOptions[option.type].max)
                        size = `(${dataTypes_1.dataTypesOptions[option.type].max})`;
                }
                else if (dataTypes_1.dataTypesOptions[option.type].default) {
                    size = `(${dataTypes_1.dataTypesOptions[option.type].default})`;
                }
                mysql += `${option.type}${size} `;
                if (option.null === undefined)
                    option.null = false;
                Object.keys(option).forEach((key, j) => {
                    option = option;
                    if (key === 'null')
                        mysql += `${!option[key] ? "NOT " : ""}NULL`;
                    else if (key === 'autoinc' && option[key])
                        mysql += `AUTO_INCREMENT ${!hasId ? 'PRIMARY' : 'UNIQUE'} KEY`;
                    else if ((key === 'primaryKey' || key === 'unsigned' || key === 'unique') && option[key])
                        mysql += `${key === 'primaryKey' ? 'PRIMARY KEY' : key === 'unsigned' ? 'UNSIGNED' : 'UNIQUE KEY'}`;
                    if (key !== 'size' && key !== 'type' && j !== Object.keys(option).length - 1)
                        mysql += " ";
                });
            }
            else {
                mysql += `${option}${dataTypes_1.dataTypesOptions[option].default ? "(" + dataTypes_1.dataTypesOptions[option].default + ")" : ""} NOT NULL`;
            }
            if (i !== Object.keys(this.obj).length - 1)
                mysql += ", ";
        });
        Object.keys(this.indexes).forEach((index, i) => {
            indexSql += `INDEX ${index} (`;
            this.indexes[index].forEach((field, j) => {
                if (this.obj[field])
                    indexSql += `${field}${j !== this.indexes[index].length - 1 ? ', ' : ''}`;
            });
            indexSql += `)${i !== Object.keys(this.indexes).length - 1 ? ', ' : ''}`;
        });
        if (indexSql.trim() !== '')
            mysql += ', ' + indexSql;
        return mysql;
    }
}
exports.default = Schema;
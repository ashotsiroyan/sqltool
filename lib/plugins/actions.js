"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions = {
    $lt: '<',
    $gt: '>',
    $lte: '<=',
    $gte: '>=',
    $eq: '=',
    $ne: '!=',
    $in: 'LIKE',
    $nin: 'NOT LIKE'
};
exports.default = actions;

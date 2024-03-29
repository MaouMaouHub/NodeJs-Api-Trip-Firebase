"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryAsync = exports.conn = void 0;
const mysql_1 = __importDefault(require("mysql"));
const util_1 = __importDefault(require("util"));
exports.conn = mysql_1.default.createPool({
    connectionLimit: 10,
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
});
exports.queryAsync = util_1.default.promisify(exports.conn.query).bind(exports.conn);
//# sourceMappingURL=dbconnect.js.map
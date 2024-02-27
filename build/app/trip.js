"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const dbconnect_1 = require("../config/dbconnect");
exports.router = express_1.default.Router();
exports.router.get("/", (req, res) => {
    if (req.query.id) {
        res.send("GET ID in trip.ts with id " + req.query.id);
    }
    else {
        const sql = "select * from trip";
        dbconnect_1.conn.query(sql, (err, result) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(result);
            }
        });
    }
});
exports.router.get("/:id", (req, res) => {
    // get by id at /:id from conn server
    const sql = "select * from trip where idx = ?";
    dbconnect_1.conn.query(sql, [req.params.id], (err, result) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.json(result);
        }
    });
});
// search method by id or name, path = "/search/fields"
exports.router.get("/search/fields", (req, res) => {
    const id = req.query.id;
    const name = req.query.name;
    const price = req.query.price;
    const sql = `select * from trip 
                where (idx is null or idx = ?) 
                or (price is null or price < ?)
                or (name is null or name like ?)
                `;
    dbconnect_1.conn.query(sql, [id, price, `%${name}%`], (err, result) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.json(result);
        }
    });
});
// receive by body only put or post
// router.post("/", (req:Request, res: Response) => {
//   res.status(202);
//   // check type of body
//   if (typeof req.body === "string") {
//     // string raw text
//     res.send(`Post in trip.ts with body ${req.body}`);
//   } else if (typeof req.body === "object") {
//     // json
//     res.json(req.body);
//   } else res.send("Post in trip.ts with body");
// });
// Create Trip
exports.router.post("/", (req, res) => {
    const trip = req.body;
    let sql = "INSERT INTO `trip`(`name`, `country`, `destinationid`, `coverimage`, `detail`, `price`, `duration`) VALUES (?,?,?,?,?,?,?)";
    // bind value to sql
    sql = mysql_1.default.format(sql, [
        trip.name,
        trip.country,
        trip.destinationid,
        trip.coverimage,
        trip.detail,
        trip.price,
        trip.duration,
    ]);
    // execute sql
    dbconnect_1.conn.query(sql, (err, result) => {
        // send response
        if (err) {
            res.status(500).send({
                message: "Error",
                error: err,
            });
        }
        else {
            res.json({
                message: "Trip created",
                index: result.insertId,
            });
        }
    });
});
// Delete Trip /:id
exports.router.delete("/:id", (req, res) => {
    const id = +req.params.id;
    // check id required
    if (!id)
        res.json({ message: "id is required" });
    // sql command
    let sql = "DELETE FROM `trip` WHERE `idx` = ?";
    // execute
    dbconnect_1.conn.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).send({
                message: "Error",
                error: err,
            });
        }
        else {
            res.json({ message: "Trip deleted" });
        }
    });
});
// Update Trip /:id
exports.router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.id;
    const trip = req.body;
    // check id and trip required
    if (!id || !trip)
        return res.status(400).json({ message: "id and trip are required" });
    // dynamic sql with get data from trip first
    let tripOriginal = yield (0, dbconnect_1.queryAsync)("SELECT * FROM `trip` WHERE `idx` = ?", [
        id,
    ]);
    if (!tripOriginal.length) {
        return res.status(404).json({ message: "Trip not found" });
    }
    // cast to Trip
    tripOriginal = tripOriginal[0];
    // merge new data into old data
    const newTrip = Object.assign(Object.assign({}, tripOriginal), trip);
    // sql command
    let sql = "UPDATE `trip` SET `name`=?, `country`=?, `destinationid`=?, `coverimage`=?, `detail`=?, `price`=?, `duration`=? WHERE `idx` = ?";
    // bind value to sql
    sql = mysql_1.default.format(sql, [
        newTrip.name,
        newTrip.country,
        newTrip.destinationid,
        newTrip.coverimage,
        newTrip.detail,
        newTrip.price,
        newTrip.duration,
        id,
    ]);
    // execute
    dbconnect_1.conn.query(sql, (err, result) => {
        if (err) {
            res.status(500).send({
                message: "Error",
                error: err,
            });
        }
        else {
            res.json({
                message: "Trip updated",
                affectedRows: result.affectedRows,
            });
        }
    });
}));
//# sourceMappingURL=trip.js.map
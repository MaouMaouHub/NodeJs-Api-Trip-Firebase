import express, { Request, Response, response } from "express";
import mysql from "mysql";
import { conn, queryAsync } from "../config/dbconnect";
import { Trip } from "Trip";

export const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  if (req.query.id) {
    res.send("GET ID in trip.ts with id " + req.query.id);
  } else {
    const sql = "select * from trip";
    conn.query(sql, (err: mysql.MysqlError | null, result: mysql.OkPacket) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(result);
      }
    });
  }
});

router.get("/:id", (req: Request, res: Response) => {
  // get by id at /:id from conn server
  const sql = "select * from trip where idx = ?";
  conn.query(
    sql,
    [req.params.id],
    (err: mysql.MysqlError | null, result: mysql.OkPacket) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(result);
      }
    }
  );
});

// search method by id or name, path = "/search/fields"
router.get("/search/fields", (req: Request, res: Response) => {
  const id = req.query.id;
  const name = req.query.name;
  const price = req.query.price;
  const sql = `select * from trip 
                where (idx is null or idx = ?) 
                or (price is null or price < ?)
                or (name is null or name like ?)
                `;
  conn.query(
    sql,
    [id, price, `%${name}%`],
    (err: mysql.MysqlError | null, result: mysql.OkPacket) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(result);
      }
    }
  );
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
router.post("/", (req: Request, res: Response) => {
  const trip: Trip = req.body;
  let sql =
    "INSERT INTO `trip`(`name`, `country`, `destinationid`, `coverimage`, `detail`, `price`, `duration`) VALUES (?,?,?,?,?,?,?)";
  // bind value to sql
  sql = mysql.format(sql, [
    trip.name,
    trip.country,
    trip.destinationid,
    trip.coverimage,
    trip.detail,
    trip.price,
    trip.duration,
  ]);
  // execute sql
  conn.query(sql, (err: mysql.MysqlError | null, result: mysql.OkPacket) => {
    // send response
    if (err) {
      res.status(500).send({
        message: "Error",
        error: err,
      });
    } else {
      res.json({
        message: "Trip created",
        index: result.insertId,
      });
    }
  });
});

// Delete Trip /:id
router.delete("/:id", (req: Request, res: Response) => {
  const id = +req.params.id;

  // check id required
  if (!id) res.json({ message: "id is required" });

  // sql command
  let sql = "DELETE FROM `trip` WHERE `idx` = ?";

  // execute
  conn.query(
    sql,
    [id],
    (err: mysql.MysqlError | null, result: mysql.OkPacket) => {
      if (err) {
        res.status(500).send({
          message: "Error",
          error: err,
        });
      } else {
        res.json({ message: "Trip deleted" });
      }
    }
  );
});

// Update Trip /:id
router.put("/:id", async (req: Request, res: Response) => {
  const id = +req.params.id;
  const trip: Trip = req.body;

  // check id and trip required
  if (!id || !trip)
    return res.status(400).json({ message: "id and trip are required" });
  // dynamic sql with get data from trip first
  let tripOriginal = await queryAsync("SELECT * FROM `trip` WHERE `idx` = ?", [
    id,
  ]);

  if (!tripOriginal.length) {
    return res.status(404).json({ message: "Trip not found" });
  }

  // cast to Trip
  tripOriginal = tripOriginal[0] as Trip;

  // merge new data into old data
  const newTrip: Trip = { ...tripOriginal, ...trip };

  // sql command
  let sql =
    "UPDATE `trip` SET `name`=?, `country`=?, `destinationid`=?, `coverimage`=?, `detail`=?, `price`=?, `duration`=? WHERE `idx` = ?";
  // bind value to sql
  sql = mysql.format(sql, [
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
  conn.query(sql, (err: mysql.MysqlError | null, result: mysql.OkPacket) => {
    if (err) {
      res.status(500).send({
        message: "Error",
        error: err,
      });
    } else {
      res.json({
        message: "Trip updated",
        affectedRows: result.affectedRows,
      });
    }
  });
});

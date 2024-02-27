import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { router as trip } from "./app/trip";
import { router as upload } from "./app/upload";
import cors from "cors";

export const app = express();
app.use(bodyParser.text(), bodyParser.json());
app.get("/", (_req: Request, res: Response) => {
  return res.send("Express Typescript on Vercel");
});

app.get("/ping", (_req: Request, res: Response) => {
  return res.send("pong 🏓");
});

// Database
app.use("/trip", trip);

// Upload
app.use("/upload", upload);
app.use("/uploads", express.static("uploads"));

// Cors
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
  })
);

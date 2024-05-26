import cors from "cors";
import express from "express";
import morgan from "morgan";
import librariesRouter from "./libraries";
import affiliatesRouter from "./affiliates";
import { defaultErrorHandler } from "./errors";

const app = express();

app.use(cors());
//Logger
app.use(morgan("dev"));
//Manage headers
app.use(express.json());

app.use("/libraries", librariesRouter);
app.use("/affiliates", affiliatesRouter);

app.use(defaultErrorHandler);

app.get("/", async (req, res) => {
  res.status(200).json({ ok: "true", message: "hello F" });
});

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`My api listens on: http://localhost:${PORT}`);
});

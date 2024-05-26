import cors from "cors";
import express from "express";
import morgan from "morgan";
import affiliatesRouter from "./affiliates";
import { defaultErrorHandler } from "./errors";
import librariesRouter from "./libraries";
import authorsRouter from "./authors";
import booksRouter from "./books";
import borrowingsRouter from "./borrowings";

const app = express();

app.use(cors());
//Logger
app.use(morgan("dev"));
//Manage headers
app.use(express.json());

app.use("/affiliates", affiliatesRouter);
app.use("/authors", authorsRouter);
app.use("/books", booksRouter);
app.use("/borrowings", borrowingsRouter);
app.use("/libraries", librariesRouter);

app.use(defaultErrorHandler);

app.get("/", async (req, res) => {
  res.status(200).json({ ok: "true", message: "hello F" });
});

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`My api listens on: http://localhost:${PORT}`);
});

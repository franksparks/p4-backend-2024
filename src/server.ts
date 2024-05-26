import express from "express";
import morgan from "morgan";
import cors from "cors";
import { prisma } from "./db";

const app = express();

app.use(cors());
//Logger
app.use(morgan("dev"));
//Manage headers
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).json({ ok: "true", message: "hello F" });
});

app.get("/libraries", async (req, res) => {
  const libraries = await prisma.library.findMany({
    orderBy: { libraryId: "asc" },
  });
  res.status(200).json({ libraries });
});

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`My api listens on: http://localhost:${PORT}`);
});

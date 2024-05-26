import { Router } from "express";
import { prisma } from "./db";

const librariesRouter = Router();

librariesRouter.get("/", async (req, res) => {
  try {
    const libraries = await prisma.library.findMany({
      orderBy: { libraryId: "asc" },
      select: { libraryId: true, name: true, city: true },
    });
    res.status(200).json({ libraries });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//get library by id

//get library by id

//introduce a library

export default librariesRouter;

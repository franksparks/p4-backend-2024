import { Router } from "express";
import { prisma } from "./db";

const librariesRouter = Router();

librariesRouter.get("/", async (req, res) => {
  try {
    const totalLibraries = await prisma.library.count();
    const libraries = await prisma.library.findMany({
      orderBy: { libraryId: "asc" },
      select: { libraryId: true, name: true, city: true },
    });
    res
      .status(200)
      .json({ "total libraries": totalLibraries, libraries });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//get library by id
librariesRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const library = await prisma.library.findUniqueOrThrow({
      where: { libraryId: Number(id) },
      select: { libraryId: true, name: true, city: true },
    });
    res.status(200).json({ library });
  } catch (e: any) {
    if (e.name === "NotFoundError") {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(500).json({
      name: e.name,
      message: e.message,
      error: e.toString(),
    });
  }
});

//get library by name

//introduce a library
librariesRouter.post("/", async (req, res) => {
  try {
    const { name, city, address } = req.body;
    if (name === undefined || typeof name !== "string") {
      return res.status(400).json({ error: "Missing name field" });
    }
    const library = await prisma.library.create({
      data: { name, city, address },
    });
    res.status(201).json({
      message: `Id de la biblioteca introducida: ${library.libraryId}`,
      content: library,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default librariesRouter;

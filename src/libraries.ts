import { Router } from "express";
import { prisma } from "./db";
import { send } from "./response";

const librariesRouter = Router();

librariesRouter.get("/", async (req, res) => {
  try {
    const totalLibraries = await prisma.library.count();
    const libraries = await prisma.library.findMany({
      orderBy: { libraryId: "asc" },
      select: { libraryId: true, name: true, city: true },
    });
    send(res).ok({
      msg: `Total de bibliotecas: ${totalLibraries}`,
      libraries,
    });
  } catch (e) {
    send(res).internalError("Could not get the libraries");
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
    send(res).ok(library);
  } catch (e: any) {
    if (e.name === "NotFoundError") {
      return send(res).notFound();
    }
    send(res).internalError("Could not create the library.");
  }
});

//get library by name
//TODO

//introduce a library
librariesRouter.post("/", async (req, res) => {
  try {
    const { name, city, address } = req.body;
    if (name === undefined || typeof name !== "string") {
      send(res).badRequest("Missing name field");
    }
    const library = await prisma.library.create({
      data: { name, city, address },
    });
    send(res).createdOk({
      msg: `Id de la biblioteca introducida: ${library.libraryId}`,
      library,
    });
  } catch (e) {
    send(res).internalError("Could not post the library");
  }
});

export default librariesRouter;

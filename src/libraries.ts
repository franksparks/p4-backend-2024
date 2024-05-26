import { Router } from "express";
import { z } from "zod";
import { prisma } from "./db";
import { send } from "./response";

const librariesRouter = Router();

const idParamsSchema = z.object({ id: z.coerce.number() });
const libraryBodySchema = z.object({
  name: z.string().min(3).max(50),
  city: z.string().min(5).max(50),
  address: z.string().min(5).max(50),
});

librariesRouter.get("/", async (req, res, next) => {
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
    next(e);
  }
});

//get library by id
librariesRouter.get("/:id", async (req, res, next) => {
  try {
    const { id: libraryId } = idParamsSchema.parse(req.params);

    const library = await prisma.library.findUniqueOrThrow({
      where: { libraryId },
      select: { libraryId: true, name: true, city: true },
    });
    send(res).ok(library);
  } catch (e: any) {
    next(e);
  }
});

//get library by name
//TODO

//introduce a library
librariesRouter.post("/", async (req, res, next) => {
  try {
    const data = libraryBodySchema.parse(req.body);

    const library = await prisma.library.create({ data });
    send(res).createdOk({
      msg: `Id de la biblioteca introducida: ${library.libraryId}`,
      library,
    });
  } catch (e) {
    next(e);
  }
});

librariesRouter.put("/:id", async (req, res, next) => {
  try {
    const { id: libraryId } = idParamsSchema.parse(req.params);
    const bodyCheck = libraryBodySchema.parse(req.body);

    const updatedLibrary = await prisma.library.update({
      where: { libraryId },
      data: bodyCheck,
    });

    send(res).ok(updatedLibrary);
  } catch (e) {
    next(e);
  }
});

librariesRouter.delete("/:id", async (req, res, next) => {
  try {
    send(res).notImplemented();
  } catch (e) {
    next(e);
  }
});

export default librariesRouter;

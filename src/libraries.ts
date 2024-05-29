import { Router } from "express";
import { z } from "zod";
import { prisma } from "./db";
import { catchErrors } from "./errors";
import { send } from "./response";

const librariesRouter = Router();

const idParamsSchema = z.object({ id: z.coerce.number() });

const libraryBodySchema = z.object({
  name: z.string().min(3).max(50),
  city: z.string().min(5).max(50),
  address: z.string().min(5).max(50),
});
const updateLibraryBodySchema = z.object({
  name: z.string().min(3).max(50).optional(),
  city: z.string().min(5).max(50).optional(),
  address: z.string().min(5).max(50).optional(),
});

const nameQuerySchema = z.object({
  name: z.string().min(1).max(50).optional(),
});

librariesRouter.get(
  "/",
  catchErrors(async (req, res) => {
    const libraries = await prisma.library.findMany({
      orderBy: { libraryId: "asc" },
      select: { libraryId: true, name: true, city: true },
    });
    send(res).ok({
      msg: `Total de bibliotecas: ${libraries.length}`,
      libraries,
    });
  })
);

librariesRouter.get(
  "/search",
  catchErrors(async (req, res) => {
    const { name } = nameQuerySchema.parse(req.query);

    const libraries = await prisma.library.findMany({
      where: { name: { contains: name } },
      orderBy: { libraryId: "asc" },
      select: { libraryId: true, name: true, city: true },
    });

    libraries.length === 0 ? send(res).notFound() : send(res).ok({ libraries });
  })
);

//get library by id
librariesRouter.get(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: libraryId } = idParamsSchema.parse(req.params);

    const library = await prisma.library.findUniqueOrThrow({
      where: { libraryId },
      select: { libraryId: true, name: true, city: true },
    });
    send(res).ok(library);
  })
);

//introduce a library
librariesRouter.post(
  "/",
  catchErrors(async (req, res) => {
    const data = libraryBodySchema.parse(req.body);

    const library = await prisma.library.create({ data });
    send(res).createdOk({
      msg: `Id de la biblioteca introducida: ${library.libraryId}`,
      library,
    });
  })
);

librariesRouter.put(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: libraryId } = idParamsSchema.parse(req.params);
    const bodyCheck = updateLibraryBodySchema.parse(req.body);

    const updatedLibrary = await prisma.library.update({
      where: { libraryId },
      data: bodyCheck,
    });

    send(res).ok({
      msg: `Información de la biblioteca actualizada correctamente.`,
      updatedLibrary,
    });
  })
);

librariesRouter.delete(
  "/:id",
  catchErrors(async (req, res) => {
    send(res).notImplemented();
  })
);

export default librariesRouter;

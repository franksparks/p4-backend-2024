import { Router } from "express";
import { z } from "zod";
import { prisma } from "./db";
import { catchErrors } from "./errors";
import { send } from "./response";

const borrowingsRouter = Router();

const idParamsSchema = z.object({ id: z.coerce.number() });

const borrowingBodySchema = z.object({
  active: z.boolean(),
  affiliateId: z.coerce.number(),
  bookId: z.coerce.number(),
});

borrowingsRouter.get(
  "/",
  catchErrors(async (req, res) => {
    const borrowingsTotal = await prisma.borrowing.count();
    const borrowings = await prisma.borrowing.findMany({
      orderBy: { borrowingId: "asc" },
    });
    send(res).ok({
      msg: `Total de bibliotecas: ${borrowingsTotal}`,
      borrowings,
    });
  })
);

//get library by id
borrowingsRouter.get(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: borrowingId } = idParamsSchema.parse(req.params);

    const borrowing = await prisma.borrowing.findUniqueOrThrow({
      where: { borrowingId },
      select: { active: true },
    });
    send(res).ok(borrowing.active);
  })
);

borrowingsRouter.post(
  "/",
  catchErrors(async (req, res) => {
    const data = borrowingBodySchema.parse(req.body);

    //Compruebo que el libro está disponible
    const { available } = await prisma.book.findFirstOrThrow({
      where: { bookId: data.bookId },
    });

    if (available) {
      //Obtener prestamos por socio
      // Un afi no puede tener mas de 3 prestamos activos.

      const borrowing = await prisma.borrowing.create({ data });

      //Marcamos el libro como no disponible
      await prisma.book.update({
        where: { bookId: data.bookId },
        data: { available: false },
      });

      send(res).createdOk({
        borrowing,
      });
    } else {
      return send(res).badRequest(`Book is already on borrowing`);
    }
  })
);

borrowingsRouter.put(
  "/:id",
  catchErrors(async (req, res) => {
    send(res).notImplemented();
  })
);

borrowingsRouter.delete(
  "/:id",
  catchErrors(async (req, res) => {
    send(res).notImplemented();
  })
);

export default borrowingsRouter;

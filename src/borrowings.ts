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

const searchParamsSchema = z.object({
  bookId: z.coerce.number().optional(),
  affiliateId: z.coerce.number().optional(),
});

const returnBookParamsSchema = z.object({
  bookId: z.coerce.number().optional(),
  borrowingId: z.coerce.number().optional(),
});

borrowingsRouter.get(
  "/",
  catchErrors(async (req, res) => {
    const borrowingsTotal = await prisma.borrowing.count();
    const borrowings = await prisma.borrowing.findMany({
      orderBy: { borrowingId: "asc" },
    });
    send(res).ok({
      msg: `Total de prestamos en el historico: ${borrowingsTotal}`,
      borrowings,
    });
  })
);

borrowingsRouter.get(
  "/active",
  catchErrors(async (req, res) => {
    const borrowings = await prisma.borrowing.findMany({
      where: { active: true },
      orderBy: { borrowingId: "asc" },
    });
    send(res).ok({
      msg: `Total de prestamos activos: ${borrowings.length}`,
      borrowings,
    });
  })
);

borrowingsRouter.get(
  "/search",
  catchErrors(async (req, res) => {
    const { bookId, affiliateId } = searchParamsSchema.parse(req.query);

    let borrowings;
    if (bookId !== undefined) {
      borrowings = await prisma.borrowing.findMany({
        where: { bookId: bookId },
      });
    } else if (affiliateId !== undefined) {
      borrowings = await prisma.borrowing.findMany({
        where: { affiliateId: affiliateId },
      });
    } else {
      return send(res).badRequest("Introduce al menos un criterio de busqueda");
    }

    if (borrowings.length === 0) {
      send(res).notFound();
    }

    send(res).ok({ msg: `Total de prestamos: ${borrowings.length}`, borrowings });
  })
);

borrowingsRouter.get(
  "/active/search",
  catchErrors(async (req, res) => {
    const { bookId, affiliateId } = searchParamsSchema.parse(req.query);

    let borrowings;
    if (bookId !== undefined) {
      borrowings = await prisma.borrowing.findMany({
        where: { bookId: bookId, active: true },
      });
    } else if (affiliateId !== undefined) {
      borrowings = await prisma.borrowing.findMany({
        where: { affiliateId: affiliateId, active: true },
      });
    } else {
      return send(res).badRequest("Introduce al menos un criterio de busqueda");
    }

    if (borrowings.length === 0) {
      send(res).notFound();
    }

    send(res).ok({ msg: `Total de prestamos: ${borrowings.length}`, borrowings });
  })
);

borrowingsRouter.get(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: borrowingId } = idParamsSchema.parse(req.params);

    const borrowing = await prisma.borrowing.findUniqueOrThrow({
      where: { borrowingId },
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
      const data = borrowingBodySchema.parse(req.body);
      const activeBorrowings = await prisma.borrowing.findMany({
        where: { active: true, affiliateId: data.affiliateId },
      });
      // Un affiliate no puede tener mas de 3 prestamos activos.
      if (activeBorrowings.length >= 3) {
        return send(res).badRequest(`Affiliate cannot borrow more books.`);
      }

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
    const { id: bookId } = idParamsSchema.parse(req.body);

    //Compruebo que el libro esta en prestamo
    const available = await prisma.book.findFirstOrThrow({
      where: { bookId },
    });
    if (available) {
      return send(res).badRequest(
        "El libro no está en prestamo, así que no se puede devolver."
      );
    }
    const borrowing = await prisma.borrowing.findFirstOrThrow({
      where: { bookId: bookId },
    });

    const updatedBorrowing = await prisma.borrowing.update({
      where: { borrowingId: borrowing.borrowingId },
      data: { active: false },
    });

    const updatedBook = await prisma.book.update({
      where: { bookId },
      data: { available: true },
    });
  })
);

borrowingsRouter.delete(
  "/:id",
  catchErrors(async (req, res) => {
    send(res).notImplemented();
  })
);

export default borrowingsRouter;

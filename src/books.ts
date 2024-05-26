import { Router } from "express";
import { prisma } from "./db";
import { catchErrors } from "./errors";
import { send } from "./response";
import { number, z } from "zod";

const booksRouter = Router();

const idParamsSchema = z.object({ id: z.coerce.number() });

const bookBodySchema = z.object({
  title: z.string().min(3).max(50),
  pages: z.number(),
  available: z.boolean(),
  libraryId: z.coerce.number(),
  authorId: z.coerce.number(),
});

const searchParamsSchema = z.object({
  authorId: z.coerce.number().optional(),
  title: z.string().min(3).max(50).optional(),
});

booksRouter.get(
  "/",
  catchErrors(async (req, res) => {
    const booksTotal = await prisma.book.count();
    const books = await prisma.book.findMany({
      orderBy: { libraryId: "asc" },
      select: {
        bookId: true,
        title: true,
        libraryId: true,
        authorId: true,
      },
    });
    send(res).ok({
      msg: `Total de libros: ${booksTotal}`,
      books,
    });
  })
);

booksRouter.get(
  "/search",
  catchErrors(async (req, res) => {
    const { authorId, title } = searchParamsSchema.parse(req.query);

    let books;
    if (authorId !== undefined) {
      books = await prisma.book.findMany({
        where: { authorId: authorId },
      });
    } else if (title !== undefined) {
      books = await prisma.book.findMany({
        where: { title: { contains: title, mode: "insensitive" } },
        orderBy: { bookId: "asc" },
      });
    } else {
      return send(res).badRequest("Introduce al menos un criterio de busqueda");
    }

    if (books.length === 0) {
      send(res).notFound();
    }

    send(res).ok({ msg: `Total de libros: ${books.length}`, books });
  })
);

booksRouter.get(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: bookId } = idParamsSchema.parse(req.params);

    const book = await prisma.book.findUniqueOrThrow({
      where: { bookId },
      select: {
        bookId: true,
        title: true,
        available: true,
        libraryId: true,
        authorId: true,
      },
    });
    send(res).ok(book);
  })
);

booksRouter.post(
  "/",
  catchErrors(async (req, res) => {
    const data = bookBodySchema.parse(req.body);

    const book = await prisma.book.create({ data });
    send(res).createdOk({
      msg: `Id del libro introducido: ${book.bookId}`,
      book,
    });
  })
);

booksRouter.put(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: bookId } = idParamsSchema.parse(req.params);
    const bodyCheck = bookBodySchema.parse(req.body);

    const updatedBook = await prisma.book.update({
      where: { bookId },
      data: bodyCheck,
    });

    send(res).ok(updatedBook);
  })
);

booksRouter.delete(
  "/:id",
  catchErrors(async (req, res) => {
    send(res).notImplemented();
  })
);

export default booksRouter;

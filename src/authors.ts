import { Router } from "express";
import { z } from "zod";
import { prisma } from "./db";
import { catchErrors } from "./errors";
import { send } from "./response";

const authorsRouter = Router();

const idParamsSchema = z.object({ id: z.coerce.number() });

const authorBodySchema = z.object({
  name: z.string().min(3).max(50),
  lastName: z.string().min(3).max(50),
  birthPlace: z.string().min(3).max(100),
});

const updateAuthorBodySchema = z.object({
  name: z.string().min(3).max(50).optional(),
  lastName: z.string().min(3).max(50).optional(),
  birthPlace: z.string().min(3).max(100).optional(),
});

const lastNameQuerySchema = z.object({
  lastName: z.string().min(1).max(50).optional(),
});

authorsRouter.get(
  "/",
  catchErrors(async (req, res) => {
    const authors = await prisma.author.findMany({
      orderBy: { authorId: "asc" },
    });
    send(res).ok({
      msg: `Total de autores: ${authors.length}`,
      authors,
    });
  })
);

authorsRouter.get(
  "/search",
  catchErrors(async (req, res) => {
    const { lastName } = lastNameQuerySchema.parse(req.query);

    const authors = await prisma.author.findMany({
      where: {
        lastName: {
          contains: lastName,
        },
      },
      orderBy: { authorId: "asc" },
    });

    if (authors.length === 0) {
      send(res).notFound();
    }

    send(res).ok({ authors });
  })
);

authorsRouter.get(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: authorId } = idParamsSchema.parse(req.params);
    const author = await prisma.author.findUniqueOrThrow({
      where: { authorId },
    });
    send(res).ok({ author });
  })
);

authorsRouter.post(
  "/",
  catchErrors(async (req, res) => {
    const data = authorBodySchema.parse(req.body);
    const author = await prisma.author.create({ data });
    send(res).createdOk({
      msg: `Id del autor introducido: ${author.authorId}`,
      author,
    });
  })
);

authorsRouter.put(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: authorId } = idParamsSchema.parse(req.params);
    const bodyCheck = updateAuthorBodySchema.parse(req.body);

    const updatedAuthor = await prisma.author.update({
      where: { authorId },
      data: bodyCheck,
    });

    send(res).ok(updatedAuthor);
  })
);

authorsRouter.delete(
  "/:id",
  catchErrors(async (req, res) => {
    send(res).notImplemented();
  })
);

export default authorsRouter;

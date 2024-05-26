import { Router } from "express";
import { prisma } from "./db";
import { catchErrors } from "./errors";
import { send } from "./response";

const borrowingsRouter = Router();

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

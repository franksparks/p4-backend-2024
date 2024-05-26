import { Router } from "express";
import { z } from "zod";
import { prisma } from "./db";
import { catchErrors } from "./errors";
import { send } from "./response";

const affiliatesRouter = Router();
const idParamsSchema = z.object({ id: z.coerce.number() });

const affiliateBodySchema = z.object({
  name: z.string().min(3).max(50),
  lastName: z.string().min(5).max(50),
  email: z.string().email(),
  city: z.string().min(3).max(50),
  libraryId: z.number(),
});

affiliatesRouter.get(
  "/",
  catchErrors(async (req, res) => {
    const affiliatesTotal = await prisma.author.count();

    const affiliates = await prisma.affiliate.findMany({
      orderBy: { affiliateId: "asc" },
      select: {
        affiliateId: true,
        name: true,
        lastName: true,
        libraryId: true,
      },
    });
    res.status(200).json({ msg: `Total de socios: ${affiliatesTotal}`, affiliates });
  })
);

affiliatesRouter.get(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: affiliateId } = idParamsSchema.parse(req.params);

    const affiliate = await prisma.affiliate.findUniqueOrThrow({
      where: { affiliateId },
      select: { affiliateId: true, name: true, lastName: true, libraryId: true },
    });
    send(res).ok(affiliate);
  })
);

affiliatesRouter.post(
  "/",
  catchErrors(async (req, res) => {
    const data = affiliateBodySchema.parse(req.body);

    const affiliate = await prisma.affiliate.create({ data });
    send(res).createdOk({
      msg: `Id de la biblioteca introducida: ${affiliate.libraryId}`,
      affiliate,
    });
  })
);

affiliatesRouter.put(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: affiliateId } = idParamsSchema.parse(req.params);
    const bodyCheck = affiliateBodySchema.parse(req.body);

    const updatedAffiliate = await prisma.affiliate.update({
      where: { affiliateId },
      data: bodyCheck,
    });

    send(res).ok(updatedAffiliate);
  })
);

affiliatesRouter.delete(
  "/:id",
  catchErrors(async (req, res) => {
    send(res).notImplemented();
  })
);

export default affiliatesRouter;

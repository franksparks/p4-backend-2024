import { Router } from "express";
import { prisma } from "./db";

const affiliatesRouter = Router();

affiliatesRouter.get("/", async (req, res) => {
  try {
    const affiliates = await prisma.affiliate.findMany({
      orderBy: { affiliateId: "asc" },
      select: {
        affiliateId: true,
        name: true,
        lastName: true,
        libraryId: true,
      },
    });
    res.status(200).json({ affiliates });
  } catch (e) {
    res.status(500).json("Internal server error");
  }
});

export default affiliatesRouter;

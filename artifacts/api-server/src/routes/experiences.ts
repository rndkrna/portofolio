import { Router, type IRouter } from "express";
import { AddExperienceBody, GetExperiencesResponseItem } from "@workspace/api-zod";
import { db, experiencesTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/experiences", async (_req, res, next) => {
  try {
    const data = await db.select().from(experiencesTable);
    const parsed = data.map((item: any) => GetExperiencesResponseItem.parse(item));
    res.json(parsed);
  } catch (err) {
    next(err);
  }
});

router.post("/experiences", async (req, res, next) => {
  try {
    const validated = AddExperienceBody.parse(req.body);

    const [inserted] = await db.insert(experiencesTable).values({
      role: validated.role,
      company: validated.company,
      period: validated.period,
      description: validated.description,
      type: validated.type,
    }).returning();

    res.json(GetExperiencesResponseItem.parse(inserted));
  } catch (err) {
    next(err);
  }
});

router.delete("/experiences/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      res.status(400).json({ error: "Invalid ID parameter" });
      return;
    }

    await db.delete(experiencesTable).where(eq(experiencesTable.id, id));
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router;

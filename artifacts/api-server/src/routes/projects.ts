import { Router, type IRouter } from "express";
import { AddProjectBody, GetProjectsResponseItem } from "@workspace/api-zod";
import { db, projectsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/projects", async (_req, res, next) => {
  try {
    const data = await db.select().from(projectsTable);
    const parsed = data.map((item: any) => GetProjectsResponseItem.parse(item));
    res.json(parsed);
  } catch (err) {
    next(err);
  }
});

router.post("/projects", async (req, res, next) => {
  try {
    const validated = AddProjectBody.parse(req.body);

    const [inserted] = await db.insert(projectsTable).values({
      title: validated.title,
      category: validated.category,
      description: validated.description,
      image: validated.image,
      year: validated.year,
      link: validated.link ?? null,
    }).returning();

    res.json(GetProjectsResponseItem.parse(inserted));
  } catch (err) {
    next(err);
  }
});

router.delete("/projects/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      res.status(400).json({ error: "Invalid ID parameter" });
      return;
    }

    await db.delete(projectsTable).where(eq(projectsTable.id, id));
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router;

import { Router } from "express";
import { db, messagesTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router = Router();

router.get("/messages", async (req, res, next) => {
  try {
    const data = await db
      .select()
      .from(messagesTable)
      .orderBy(desc(messagesTable.createdAt));
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.delete("/messages/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      res.status(400).json({ error: "Invalid ID parameter" });
      return;
    }
    
    await db.delete(messagesTable).where(eq(messagesTable.id, id));
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router;

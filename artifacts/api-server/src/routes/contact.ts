import { Router, type IRouter } from "express";
import { SubmitContactFormBody } from "@workspace/api-zod";
import { db, messagesTable } from "@workspace/db";

const router: IRouter = Router();

router.post("/contact", async (req, res, next) => {
  try {
    const validated = SubmitContactFormBody.parse(req.body);

    await db.insert(messagesTable).values({
      name: validated.name,
      email: validated.email,
      message: validated.message,
    });

    res.json({
      success: true,
      message: "Pesan berhasil dikirim",
    });
  } catch (err) {
    next(err);
  }
});

export default router;

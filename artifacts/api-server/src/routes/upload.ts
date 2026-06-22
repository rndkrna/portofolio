import { Router } from "express";

const router = Router();

router.post("/upload", async (req, res, next) => {
  try {
    const { filename, base64 } = req.body;
    if (!filename || !base64) {
      res.status(400).json({ error: "Missing filename or base64 data" });
      return;
    }

    // In serverless environments, we cannot write to the local filesystem.
    // Instead, we return the base64 data URI directly, which will be saved
    // in the PostgreSQL database.
    res.json({
      success: true,
      url: base64
    });
  } catch (err) {
    next(err);
  }
});

export default router;

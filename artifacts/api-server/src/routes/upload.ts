import { Router } from "express";
import fs from "fs/promises";
import path from "path";

const router = Router();
const targetDir = path.resolve(import.meta.dirname, "../../../portfolio/public/images");

router.post("/upload", async (req, res, next) => {
  try {
    const { filename, base64 } = req.body;
    if (!filename || !base64) {
      res.status(400).json({ error: "Missing filename or base64 data" });
      return;
    }

    // Clean up base64 prefix if present (e.g., "data:image/png;base64,")
    const cleanBase64 = base64.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(cleanBase64, "base64");

    // Ensure filename is safe to prevent directory traversal
    const safeFilename = path.basename(filename);
    const targetPath = path.join(targetDir, safeFilename);

    // Save the file
    await fs.writeFile(targetPath, buffer);

    res.json({
      success: true,
      url: `/images/${safeFilename}`
    });
  } catch (err) {
    next(err);
  }
});

export default router;

import { Router } from "express";
import fs from "fs/promises";
import path from "path";

import { existsSync } from "fs";

const router = Router();

// Robust path resolution for profile.json
let dataPath = path.resolve(process.cwd(), "src/data/profile.json");
if (!existsSync(dataPath)) {
  dataPath = path.resolve(process.cwd(), "artifacts/api-server/src/data/profile.json");
}
if (!existsSync(dataPath)) {
  dataPath = path.resolve(import.meta.dirname, "../src/data/profile.json");
}
if (!existsSync(dataPath)) {
  dataPath = path.resolve(import.meta.dirname, "../data/profile.json");
}

router.get("/profile", async (req, res, next) => {
  try {
    const data = await fs.readFile(dataPath, "utf-8");
    res.json(JSON.parse(data));
  } catch (err) {
    next(err);
  }
});

router.post("/profile", async (req, res, next) => {
  try {
    const newProfile = req.body;
    await fs.writeFile(dataPath, JSON.stringify(newProfile, null, 2), "utf-8");
    res.json({ success: true, profile: newProfile });
  } catch (err) {
    next(err);
  }
});

export default router;

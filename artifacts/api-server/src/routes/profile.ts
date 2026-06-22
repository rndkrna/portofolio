import { Router } from "express";
import fs from "fs/promises";
import path from "path";
import { existsSync } from "fs";
import { db, profileTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.use((req, res, next) => {
  res.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate",
  );
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  next();
});

// Robust path resolution for profile.json
let dataPath = path.resolve(process.cwd(), "src/data/profile.json");
if (!existsSync(dataPath)) {
  dataPath = path.resolve(
    process.cwd(),
    "artifacts/api-server/src/data/profile.json",
  );
}
if (!existsSync(dataPath)) {
  dataPath = path.resolve(import.meta.dirname, "../src/data/profile.json");
}
if (!existsSync(dataPath)) {
  dataPath = path.resolve(import.meta.dirname, "../data/profile.json");
}

router.get("/profile", async (req, res, next) => {
  try {
    // 1. Try to fetch from database
    const dbProfiles = await db.select().from(profileTable).limit(1);

    if (dbProfiles.length > 0) {
      res.json(dbProfiles[0]);
      return;
    }

    // 2. Fallback: Read from local JSON and seed database
    const data = await fs.readFile(dataPath, "utf-8");
    const initialProfile = JSON.parse(data);

    const [inserted] = await db
      .insert(profileTable)
      .values({
        name: initialProfile.name,
        role: initialProfile.role,
        bio: initialProfile.bio,
        avatar: initialProfile.avatar,
        aboutParagraph1: initialProfile.aboutParagraph1,
        aboutParagraph2: initialProfile.aboutParagraph2,
        quote: initialProfile.quote,
      })
      .returning();

    res.json(inserted);
  } catch (err) {
    next(err);
  }
});

router.post("/profile", async (req, res, next) => {
  try {
    const newProfile = req.body;

    // Check if profile exists
    const dbProfiles = await db.select().from(profileTable).limit(1);

    if (dbProfiles.length > 0) {
      // Update existing profile (assuming id is the primary key and we update the first record)
      const [updated] = await db
        .update(profileTable)
        .set({
          name: newProfile.name,
          role: newProfile.role,
          bio: newProfile.bio,
          avatar: newProfile.avatar,
          aboutParagraph1: newProfile.aboutParagraph1,
          aboutParagraph2: newProfile.aboutParagraph2,
          quote: newProfile.quote,
        })
        .where(eq(profileTable.id, dbProfiles[0].id))
        .returning();
      res.json({ success: true, profile: updated });
    } else {
      // Insert new profile
      const [inserted] = await db
        .insert(profileTable)
        .values({
          name: newProfile.name,
          role: newProfile.role,
          bio: newProfile.bio,
          avatar: newProfile.avatar,
          aboutParagraph1: newProfile.aboutParagraph1,
          aboutParagraph2: newProfile.aboutParagraph2,
          quote: newProfile.quote,
        })
        .returning();
      res.json({ success: true, profile: inserted });
    }
  } catch (err) {
    next(err);
  }
});

export default router;

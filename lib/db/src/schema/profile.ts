import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { z } from "zod";

export const profileTable = pgTable("profile", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  bio: text("bio").notNull(),
  avatar: text("avatar").notNull(),
  aboutParagraph1: text("aboutParagraph1").notNull(),
  aboutParagraph2: text("aboutParagraph2").notNull(),
  quote: text("quote").notNull(),
});

export const updateProfileSchema = z.object({
  name: z.string(),
  role: z.string(),
  bio: z.string(),
  avatar: z.string(),
  aboutParagraph1: z.string(),
  aboutParagraph2: z.string(),
  quote: z.string(),
});

export type UpdateProfile = z.infer<typeof updateProfileSchema>;
export type Profile = typeof profileTable.$inferSelect;

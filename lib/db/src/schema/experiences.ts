import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { z } from "zod";

export const experiencesTable = pgTable("experiences", {
  id: serial("id").primaryKey(),
  role: text("role").notNull(),
  company: text("company").notNull(),
  period: text("period").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // 'professional' or 'leadership'
});

export const insertExperienceSchema = z.object({
  role: z.string(),
  company: z.string(),
  period: z.string(),
  description: z.string(),
  type: z.string(),
});

export type InsertExperience = z.infer<typeof insertExperienceSchema>;
export type Experience = typeof experiencesTable.$inferSelect;

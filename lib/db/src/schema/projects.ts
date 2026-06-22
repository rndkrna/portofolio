import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { z } from "zod";

export const projectsTable = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  year: text("year").notNull(),
  link: text("link"),
});

export const insertProjectSchema = z.object({
  title: z.string(),
  category: z.string(),
  description: z.string(),
  image: z.string(),
  year: z.string(),
  link: z.string().optional().nullable(),
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projectsTable.$inferSelect;

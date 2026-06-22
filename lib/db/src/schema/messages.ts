import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";

export const messagesTable = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMessageSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messagesTable.$inferSelect;

import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { guides as projects } from "../schema";
import { timestamps } from "@/lib/db";

// Schema for partners - used to validate API requests
const baseSchema = createSelectSchema(projects, {
}).omit(timestamps);

export const insertGuideSchema =
  createInsertSchema(projects).omit(timestamps);
export const insertGuideParams = baseSchema
  .omit({
    id: true,
  });

export const updateGuideSchema = baseSchema;
export const updateGuideParams = baseSchema;
export const guideIdSchema = baseSchema.pick({ id: true });

// Types for partners - used to type API request params and within Components
export type Project = typeof projects.$inferSelect;
export type NewProject = z.infer<typeof insertGuideSchema>;
export type ProjectId = z.infer<typeof guideIdSchema>["id"];



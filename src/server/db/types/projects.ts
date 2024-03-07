import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { projects } from "../schema";
import { timestamps } from "@/lib/db";

// Schema for partners - used to validate API requests
const baseSchema = createSelectSchema(projects).omit(timestamps);

export const insertProjectSchema =
  createInsertSchema(projects).omit(timestamps);
export const insertProjectParams = baseSchema
  .extend({
    isVerified: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateProjectSchema = baseSchema;
export const updateProjectParams = baseSchema.extend({
  isVerified: z.coerce.boolean(),
});
export const partnerIdSchema = baseSchema.pick({ id: true });

// Types for partners - used to type API request params and within Components
export type Project = typeof projects.$inferSelect;
export type NewProject = z.infer<typeof insertProjectSchema>;
export type NewProjectParams = z.infer<typeof insertProjectParams>;
export type UpdateProjectParams = z.infer<typeof insertProjectParams>;
export type ProjectId = z.infer<typeof partnerIdSchema>["id"];

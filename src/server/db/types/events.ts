//@ts-nocheck
import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { events } from "../schema";
import { timestamps } from "@/lib/db";

// Schema for partners - used to validate API requests
const baseSchema = createSelectSchema(events).omit(timestamps);

export const inserteventschema =
  createInsertSchema(events).omit(timestamps);
export const insertEventsParams = baseSchema
  .extend({
    isVerified: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateeventschema = baseSchema;
export const updateProjectParams = baseSchema.extend({
  isVerified: z.coerce.boolean(),
});
export const partnerIdSchema = baseSchema.pick({ id: true });

// Types for partners - used to type API request params and within Components
export type Project = typeof events.$inferSelect;
export type NewProject = z.infer<typeof inserteventschema>;
export type NewProjectParams = z.infer<typeof insertEventsParams>;
export type UpdateProjectParams = z.infer<typeof inserteventschema>;
export type ProjectId = z.infer<typeof partnerIdSchema>["id"];



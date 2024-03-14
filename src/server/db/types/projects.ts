//@ts-nocheck
import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { projects } from "../schema";
import { timestamps } from "@/lib/db";

// Schema for partners - used to validate API requests
const baseSchema = createSelectSchema(projects, {
  isPublic: z.coerce.boolean().default(false),
}).omit(timestamps);

export const insertProjectSchema =
  createInsertSchema(projects).omit(timestamps);
export const insertProjectParams = baseSchema
  .omit({
    id: true,
  });

export const updateProjectSchema = baseSchema;
export const updateProjectParams = baseSchema;
export const partnerIdSchema = baseSchema.pick({ id: true });

// Types for partners - used to type API request params and within Components
export type Project = typeof projects.$inferSelect;
export type NewProject = z.infer<typeof insertProjectSchema>;
export type NewProjectParams = z.infer<typeof insertProjectParams>;
export type UpdateProjectParams = z.infer<typeof insertProjectParams>;
export type ProjectId = z.infer<typeof partnerIdSchema>["id"];

const pro: NewProject = {
  name: "Clean Water Initiative",
  startDate: "2024-03-09T19:12:04.565Z",
  isPublic: true,
  desc: "Bringing clean and safe drinking water to communities in need.",
  progress: 7.5,
  challenge: "Many communities around the world lack access to clean water, leading to health issues and limiting opportunities for growth and development. Our initiative aims to address this challenge by implementing sustainable solutions for providing clean and safe drinking water to those in need.",
  approach: "We work with local partners and communities to identify the most effective and sustainable solutions. This includes implementing water purification systems, building infrastructure for water access, and providing training on maintenance and management. We focus on long-term impact, ensuring that the solutions we put in place continue to benefit the community for years to come.",
  imageUrl: "https://placehold.co/600x400"
}

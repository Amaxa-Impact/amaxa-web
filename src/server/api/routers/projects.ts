import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { projects } from "@/server/db/schema";
import { insertProjectParams, partnerIdSchema } from "@/server/db/types/projects";
import { and, eq, inArray } from "drizzle-orm";
import { filterColumn } from "@/lib/utils";

export const projectRouter = createTRPCRouter({
  create: protectedProcedure
    .input(insertProjectParams)
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await ctx.db.insert(projects).values(input);
    }),
  byId: publicProcedure
    .input(partnerIdSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.select().from(projects).where(eq(projects.id, input.id))
    }),

  all: publicProcedure
    .input(z.object({
      name: z.string().optional()
    }))
    .query(async ({ ctx, input }) => {

      const { name } = input

      const condition = and(
        name ? filterColumn({ column: projects.name, value: name }) : undefined,
      );

      const data = await ctx.db.query.projects.findMany({
        where: condition
      });

      return data
    })

})

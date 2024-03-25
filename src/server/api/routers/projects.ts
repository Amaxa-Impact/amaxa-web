import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { projects } from "@/server/db/schema";
import { insertProjectParams, partnerIdSchema } from "@/server/db/types/projects";
import { and, eq, inArray } from "drizzle-orm";
import { filterColumn } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const projectRouter = createTRPCRouter({
  create: protectedProcedure
    .input(insertProjectParams)
    .mutation(async ({ ctx, input }) => {

      console.log(`crfaete project`);
      
      await ctx.db.insert(projects).values(input);
      revalidatePath("/projects")
    }),
  byId: publicProcedure
    .input(partnerIdSchema)
    .query(async ({ ctx, input }) => {
      const [data] = await ctx.db.select().from(projects).where(eq(projects.id, input.id))
      return data
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

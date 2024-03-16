import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { filterColumn } from "@/lib/utils";
import { guides, projects } from "@/server/db/schema";
import { and } from "drizzle-orm";


export const actionGuideRouter = createTRPCRouter({
  all: publicProcedure
    .input(z.object({
      name: z.string().optional()

    }))
    .query(async ({ ctx, input }) => {
      const { name } = input

      const condition = and(
        name ? filterColumn({ column: guides.name, value: name }) : undefined,

      );

      const data = await ctx.db.query.guides.findMany({
        where: condition
      });

      return data
    }),

  projectNames: publicProcedure
    .query(async ({ ctx }) => {
      return await ctx.db.query.projects.findMany({
        columns: {
          name: true,
          id: true,
        }
      })
    }),
  skillNames: publicProcedure
    .query(async ({ ctx }) => {
      return await ctx.db.query.skills.findMany({
        columns: {
          name: true,
          id: true,
        }
      })
    })

})

import { filterColumn } from "@/lib/utils";
import { projects } from "@/server/db/schema";
import { and } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";


export const projectRouter = createTRPCRouter({

  all: publicProcedure
    .input(z.object({
      name: z.string().optional()
    }))
    .query(async ({ ctx, input }) => {

      const { name } = input

      const condition = and(
        name ? filterColumn({ column: projects.name, value: name }) : undefined,
      );

      const data = await ctx.db.query.events.findMany({
        where: condition
      });

      return data
    })


})


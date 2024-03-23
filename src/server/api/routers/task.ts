import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { edges, nodes } from "@/server/db/schema";
import { eq, sql } from "drizzle-orm";



export const taskRouter = createTRPCRouter({
  createTask: protectedProcedure
    .input(
      z.object({
        tasks: z.array(
          z.object({
            id: z.string(),
            position: z.object({
              x: z.number(),
              y: z.number(),
            }),
            data: z.object({
              name: z.string(),
              assigne: z.number(),
              assigneName: z.string(),
              endDate: z.date(),
            }),
            projectId: z.number(),
            parentId: z.string().optional(),
            type: z.string().default("custom"),
          })
        ),
        edges: z.array(
          z.object({
            id: z.string(),
            projectId: z.number(),
            source: z.string(),
            target: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Insert or update tasks
      await ctx.db.insert(nodes).values(
        input.tasks
      ).onConflictDoNothing();

      // Insert or update edges
      await ctx.db.insert(edges).values(
        input.edges
      ).onConflictDoNothing();
    }),

  byProjectId: protectedProcedure
    .input(z.object({
      id: z.number()
    })).query(async ({ ctx, input }) => {
      const { id: projectId } = input
      const nods = await ctx.db.query.nodes.findMany({
        where: eq(nodes.projectId, projectId),
      });
      console.log(nods)
      const edgs = await ctx.db.query.edges.findMany({
        where: eq(edges.projectId, projectId)
      })

      return {
        nodes: nods,
        edges: edgs
      }
    })
})

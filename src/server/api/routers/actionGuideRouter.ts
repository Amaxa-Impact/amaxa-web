import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { filterColumn } from "@/lib/utils";
import { guides, projectToGuides, projects, skillToGuides, skillToGuidesRelations } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { insertGuideSchema } from "@/server/db/types/guides";
import { revalidatePath } from "next/cache";


export const actionGuideRouter = createTRPCRouter({
  all: publicProcedure
    .input(z.object({
      //TODO: add the rest of the filters
      name: z.string().optional(),
      projectId: z.number().optional(),
      skillId: z.number().optional()

    }))
    .query(async ({ ctx, input }) => {
      const { name, projectId, skillId } = input

      const condition = and(
        name ? filterColumn({ column: guides.name, value: name }) : undefined,
        projectId ? eq(projectToGuides.projectId, projectId) : undefined,
        skillId ? eq(skillToGuides.skillId, skillId) : undefined,
      );

      const data = await ctx.db.query.guides.findMany({
        where: condition,

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
    }),
  create: protectedProcedure
    .input(insertGuideSchema)
    .mutation(async ({ ctx, input }) => {
      if (!(ctx.session.user.permissions.includes("add:action_guide"))) {
        throw new Error("None")
      }
      console.log(`crfaete action guide`);

      await ctx.db.insert(guides).values(input);
      revalidatePath("/action_guides")
    })


})

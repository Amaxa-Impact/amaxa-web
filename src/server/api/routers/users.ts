import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { UserPermissions } from "@/types/permissions";
import { revalidatePath } from "next/cache";



export const userRouter = createTRPCRouter({
  update: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        permissions: z.array(z.string()),
      })
    ).mutation(async ({ ctx, input }) => {
      const { userId, permissions } = input

      await ctx.db.update(users).set({
        permissions: permissions as UserPermissions[],
      }).where(eq(users.id, userId))

      revalidatePath(`/user/${userId}`)
    }),
  byProjectId: protectedProcedure
    .input(z.object({
      id: z.number()
    })).query(async ({ ctx, input }) => {
      const data = await ctx.db.query.users.findMany({
        where: (users, { eq }) => eq(users.projectId, input.id),
        columns: {
          id: true,
          name: true
        }
      })
      return data.map((item) => ({
        label: item.name!,
        value: item.id
      }))

    })


})

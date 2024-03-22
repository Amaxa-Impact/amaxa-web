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
    })


})

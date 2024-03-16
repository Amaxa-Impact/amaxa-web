import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { UserPermissions } from "@/types/permissions";



export const userRouter = createTRPCRouter({
  update: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        permissions: z.array(z.string()),
      })
    ).mutation(async ({ ctx, input }) => {
      //FIX: make sure user has permissions before prooceding
      const { userId, permissions } = input

      await ctx.db.update(users).set({
        //FIX: make the input type validated
        permissions: permissions as UserPermissions[],
      }).where(eq(users.id, userId))

    })


})

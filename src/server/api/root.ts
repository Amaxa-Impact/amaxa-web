import { postRouter } from "@/server/api/routers/post";
import { createTRPCRouter } from "@/server/api/trpc";
import { projectRouter } from "./routers/projects";
import { userRouter } from "./routers/users";
import { actionGuideRouter } from "./routers/actionGuideRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  projects: projectRouter,
  user: userRouter,
  actionGuides: actionGuideRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

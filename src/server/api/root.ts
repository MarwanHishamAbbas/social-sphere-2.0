import { createTRPCRouter } from "~/server/api/trpc";
import { postsRouter } from "~/server/api/routers/posts";
import { commentsRouter } from "./routers/comments";
import { usersRouter } from "./routers/users";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postsRouter,
  comment: commentsRouter,
  user: usersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

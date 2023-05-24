import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const commentsRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .query(({ input, ctx }) => {
      const allComments = ctx.prisma.comment.findMany({
        where: { postId: input.postId },
        include: { user: true },
        orderBy: {
          createdAt: "desc",
        },
      });
      return allComments;
    }),
  create: protectedProcedure
    .input(z.object({ commentContent: z.string(), postId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const createComment = await ctx.prisma.comment.create({
        data: {
          commentContent: input.commentContent,
          userId: ctx.auth.userId,
          postId: input.postId,
        },
      });
      return createComment;
    }),
});

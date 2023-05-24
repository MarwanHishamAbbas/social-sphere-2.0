import { clerkClient } from "@clerk/nextjs";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const commentsRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ input, ctx }) => {
      const allComments = await ctx.prisma.comment.findMany({
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
      const currentUserId = ctx.auth.userId;
      const currentUserData = await clerkClient.users.getUser(currentUserId);
      const exsitingUser = await ctx.prisma.user.findUnique({
        where: {
          email: currentUserData.emailAddresses[0]?.emailAddress,
        },
      });
      if (!exsitingUser) {
        await ctx.prisma.user.create({
          data: {
            id: currentUserData.id,
            email: currentUserData.emailAddresses[0]?.emailAddress as string,
            profileImage: currentUserData.profileImageUrl,
            username: currentUserData.username as string,
            fullName: [
              currentUserData.firstName,
              currentUserData.lastName,
            ].join(" "),
          },
        });
      }
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

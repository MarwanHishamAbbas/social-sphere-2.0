import { clerkClient } from "@clerk/nextjs";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    const allPosts = ctx.prisma.post.findMany({
      include: { user: true },
      orderBy: {
        createdAt: "desc",
      },
    });
    return allPosts;
  }),
  create: protectedProcedure
    .input(z.object({ postContent: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const currentUserId = ctx.auth.userId;
      const currentUserData = await clerkClient.users.getUser(currentUserId);
      const exsitingUser = await ctx.prisma.user.findUnique({
        where: {
          email: currentUserData.emailAddresses[0]?.emailAddress,
        },
      });
      if (exsitingUser) {
        return;
      } else {
        await ctx.prisma.user.create({
          data: {
            id: currentUserData.id,
            email: currentUserData.emailAddresses[0]?.emailAddress as string,
            profileImage: currentUserData.profileImageUrl,
            username: currentUserData.username as string,
          },
        });
      }
      const createPost = await ctx.prisma.post.create({
        data: {
          postContent: input.postContent,
          userId: ctx.auth.userId,
        },
      });
      return createPost;
    }),

  deletePost: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const deletePost = await ctx.prisma.post.delete({
        where: { id: input.postId },
      });
      return deletePost;
    }),
});

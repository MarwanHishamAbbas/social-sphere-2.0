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
  getSaved: publicProcedure.query(async ({ ctx }) => {
    const savedPosts = await ctx.prisma.post.findMany({
      where: { saved: true, userId: ctx.auth.userId as string },
      include: { user: true },
      orderBy: {
        createdAt: "desc",
      },
    });
    return savedPosts;
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
      const createPost = await ctx.prisma.post.create({
        data: {
          postContent: input.postContent,
          userId: ctx.auth.userId,
        },
      });
      return createPost;
    }),
  toggleSave: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const currentPost = await ctx.prisma.post.findUnique({
        where: { id: input.postId },
      });
      console.log(currentPost);
      const toggleSave = await ctx.prisma.post.update({
        where: { id: input.postId },
        data: { saved: !currentPost?.saved },
      });
      return toggleSave;
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

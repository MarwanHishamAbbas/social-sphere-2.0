/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { clerkClient } from "@clerk/nextjs";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const postsRouter = createTRPCRouter({
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
        console.log(exsitingUser.email);
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
});

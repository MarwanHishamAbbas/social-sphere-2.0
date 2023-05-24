import { useAuth } from "@clerk/nextjs";
import {
  Avatar,
  Card,
  Divider,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import type { User, Post } from "@prisma/client";
import { Clock } from "lucide-react";
import React, { Fragment } from "react";
import CreateCommentForm from "../comment/CreateCommentForm";
import { CommentCard } from "../comment/CommentCard";
import { formatDistance } from "date-fns";
import { api } from "~/utils/api";
import PostOptions from "./PostOptions";

interface PostCardProps {
  post: Post;
  user: User;
}

export default function PostCard({ post, user }: PostCardProps) {
  const timestamp = formatDistance(new Date(post.createdAt), new Date());
  const theme = useMantineTheme();
  const { userId, isSignedIn } = useAuth();

  const postComments = api.comment.getAll.useQuery({ postId: post.id });

  return (
    <Card withBorder>
      <Group position="apart" mb={30}>
        <Group>
          <Avatar radius={"xl"} src={user.profileImage} />
          <Stack spacing={0}>
            <Text>{user.username}</Text>
            <Text size={12} color={theme.colors.dark[2]}>
              {user.email}
            </Text>
            <Group spacing={5}>
              <Clock size={12} color={theme.colors.dark[3]} />
              <Text size={12} color={theme.colors.dark[3]}>
                {timestamp} ago
              </Text>
            </Group>
          </Stack>
        </Group>
        {userId === post.userId && <PostOptions postId={post.id} />}
      </Group>
      <Text>{post.postContent}</Text>
      <Divider my={20} />
      {isSignedIn && <CreateCommentForm postId={post.id} />}
      {postComments.data?.map((comment) => (
        <Fragment key={comment.id}>
          <CommentCard comment={comment} user={comment.user} />
        </Fragment>
      ))}
    </Card>
  );
}

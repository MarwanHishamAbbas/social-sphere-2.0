/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useAuth } from "@clerk/nextjs";
import {
  ActionIcon,
  Avatar,
  Card,
  Divider,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import type { User, Post } from "@prisma/client";
import { Clock, Trash2 } from "lucide-react";
import React, { useState } from "react";
import CreateCommentForm from "../comment/CreateCommentForm";
import { AllComments } from "../comment/AllComments";
import { formatDistance } from "date-fns";
import { api } from "~/utils/api";

interface PostCardProps {
  post: Post;
  user: User;
}

export default function PostCard({ post, user }: PostCardProps) {
  const timestamp = formatDistance(new Date(post.createdAt), new Date());
  const [loading, setLoading] = useState<boolean>(false);
  const theme = useMantineTheme();
  const { userId, isSignedIn } = useAuth();

  const deletePost = api.post.deletePost.useMutation();
  const trpcUtils = api.useContext();

  const deletePostHandler = () => {
    setLoading(true);
    deletePost.mutate(
      { postId: post.id },
      {
        onSuccess: async () => {
          setLoading(false);
          await trpcUtils.post.invalidate();
        },
      }
    );
  };

  return (
    <Card withBorder>
      <Group position="apart" mb={30}>
        <Group>
          <Avatar radius={"xl"} src={user.profileImage} />
          <Stack spacing={5}>
            <Text>{user.username}</Text>
            <Group spacing={5}>
              <Clock size={20} color={theme.colors.dark[3]} />
              <Text color={theme.colors.dark[3]}>{timestamp} ago</Text>
            </Group>
          </Stack>
        </Group>
        {userId === post.userId && (
          <ActionIcon onClick={deletePostHandler} loading={loading}>
            <Trash2 color={theme.colors.red[5]} />
          </ActionIcon>
        )}
      </Group>
      <Text>{post.postContent}</Text>
      <Divider my={20} />
      {isSignedIn && <CreateCommentForm />}
      {/* <AllComments /> */}
    </Card>
  );
}

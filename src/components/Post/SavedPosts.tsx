/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Loader, Stack, Title } from "@mantine/core";
import { api } from "~/utils/api";
import PostCard from "./PostCard";

export default function SavedPosts() {
  const savedPosts = api.post.getSaved.useQuery();

  if (savedPosts.isLoading) {
    return <Loader size={50} className="mx-auto w-full" />;
  }
  if (savedPosts.data?.length === 0) {
    return (
      <Title align="center" size={50}>
        No Saved Posts
      </Title>
    );
  }

  return (
    <Stack spacing={20}>
      {savedPosts.data?.map((post) => (
        <PostCard key={post.id} post={post} user={post.user} />
      ))}
    </Stack>
  );
}

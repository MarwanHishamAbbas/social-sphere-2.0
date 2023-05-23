import { Loader, Stack } from "@mantine/core";
import { api } from "~/utils/api";
import PostCard from "./PostCard";

export default function AllPosts() {
  const allPosts = api.post.getAll.useQuery();

  if (allPosts.isLoading) {
    return <Loader size={50} className="mx-auto w-full" />;
  }

  return (
    <Stack spacing={20}>
      {allPosts.data?.map((post) => (
        <PostCard key={post.id} post={post} user={post.user} />
      ))}
    </Stack>
  );
}

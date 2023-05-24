import { Loader, Stack, Title } from "@mantine/core";
import { api } from "~/utils/api";
import PostCard from "./PostCard";

export default function AllPosts() {
  const allPosts = api.post.getAll.useQuery();

  if (allPosts.isFetching) {
    return <Loader size={50} className="mx-auto w-full" />;
  }
  if (allPosts.data?.length === 0) {
    return (
      <Title align="center" size={50}>
        No Posts
      </Title>
    );
  }

  return (
    <Stack spacing={20}>
      {allPosts.data?.map((post) => (
        <PostCard key={post.id} post={post} user={post.user} />
      ))}
    </Stack>
  );
}

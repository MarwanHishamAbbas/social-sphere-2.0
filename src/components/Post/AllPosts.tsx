import { Loader, Stack, Title } from "@mantine/core";
import { api } from "~/utils/api";
import PostCard from "./PostCard";
import CreatePostForm from "./CreatePostForm";

export default function AllPosts() {
  const allPosts = api.post.getAll.useQuery();

  if (allPosts.isLoading) {
    return <Loader size={50} className="mx-auto w-full" />;
  }

  const noPosts = allPosts.data?.length === 0;

  return (
    <Stack spacing={20}>
      <CreatePostForm />
      {noPosts ? (
        <Title align="center" size={50}>
          No Posts
        </Title>
      ) : (
        <>
          {allPosts.data?.map((post) => (
            <PostCard key={post.id} post={post} user={post.user} />
          ))}
        </>
      )}
    </Stack>
  );
}

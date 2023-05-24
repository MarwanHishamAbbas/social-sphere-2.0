import { Box, Loader } from "@mantine/core";
import { api } from "~/utils/api";
import { UserCard } from "./UserCard";

export default function Suggestions() {
  const users = api.user.getAll.useQuery();

  if (users.isLoading) {
    return <Loader size={50} className="mx-auto w-full" />;
  }

  return (
    <Box className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
      {users.data?.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </Box>
  );
}

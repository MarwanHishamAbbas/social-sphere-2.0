import { useAuth } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/server";
import { Avatar, Text, Button, Card } from "@mantine/core";

import Link from "next/link";

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  const { userId } = useAuth();
  return (
    <Card
      className="w-full"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor: theme.colors.dark[8],
      })}
    >
      <Avatar src={user.profileImageUrl} size={120} radius={120} mx="auto" />
      <Text ta="center" fz="lg" weight={500} mt="md">
        {[user.firstName, user.lastName].join(" ")}
      </Text>
      <Text
        ta="center"
        sx={(theme) => ({
          color: theme.colors.dark[3],
        })}
        fz="sm"
      >
        {user.emailAddresses[0]?.emailAddress}
      </Text>

      {user.id === userId ? (
        <Link href="/profile/ee">
          <Button variant="default" fullWidth mt="md">
            View Profile
          </Button>
        </Link>
      ) : (
        <Button variant="default" fullWidth mt="md">
          Follow
        </Button>
      )}
    </Card>
  );
}

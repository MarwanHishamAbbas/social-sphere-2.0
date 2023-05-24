import { useAuth } from "@clerk/nextjs";
import { Avatar, Text, Button, Card } from "@mantine/core";
import type { User } from "@prisma/client";
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
      <Avatar src={user.profileImage} size={120} radius={120} mx="auto" />
      <Text ta="center" fz="lg" weight={500} mt="md">
        {user.fullName}
      </Text>
      <Text
        ta="center"
        sx={(theme) => ({
          color: theme.colors.dark[3],
        })}
        fz="sm"
      >
        {user.email}
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

import { createStyles, Text, Avatar, Group, rem } from "@mantine/core";
import type { Comment, User } from "@prisma/client";
import { formatDistance } from "date-fns";
import { Clock } from "lucide-react";

const useStyles = createStyles((theme) => ({
  body: {
    paddingLeft: rem(54),
    paddingTop: theme.spacing.sm,
  },
}));

export function CommentCard({
  comment,
  user,
}: {
  comment: Comment;
  user: User;
}) {
  const { classes, theme } = useStyles();
  const timestamp = formatDistance(new Date(comment.createdAt), new Date());

  return (
    <div className="mt-10">
      <Group>
        <Avatar src={user.profileImage} alt={user.username} radius="xl" />
        <div>
          <Text size="sm">{user.username}</Text>
          <Text size={14} color={theme.colors.dark[2]}>
            {user.email}
          </Text>
          <Group spacing={7}>
            <Clock size={12} color={theme.colors.dark[3]} />
            <Text size={12} color={theme.colors.dark[3]}>
              {timestamp} ago
            </Text>
          </Group>
        </div>
      </Group>
      <Text className={classes.body} size="sm">
        {comment.commentContent}
      </Text>
    </div>
  );
}

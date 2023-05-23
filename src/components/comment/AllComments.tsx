import { createStyles, Text, Avatar, Group, rem } from "@mantine/core";
import type { Comment } from "@prisma/client";

const useStyles = createStyles((theme) => ({
  body: {
    paddingLeft: rem(54),
    paddingTop: theme.spacing.sm,
  },
}));

export function AllComments({ comment }: { comment: Comment }) {
  const { classes } = useStyles();
  return (
    <div className="mt-10">
      <Group>
        <Avatar
          src="https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80"
          alt="Marwan"
          radius="xl"
        />
        <div>
          <Text size="sm">MarwanHisham</Text>
          <Text size="xs" color="dimmed">
            10 minutes ago
          </Text>
        </div>
      </Group>
      <Text className={classes.body} size="sm">
        This Pokémon likes to lick its palms that are sweetened by being soaked
        in honey. Teddiursa concocts its own honey by blending fruits and pollen
        collected by Beedrill. Blastoise has water spouts that protrude from its
        shell. The water spouts are very accurate.
      </Text>
    </div>
  );
}

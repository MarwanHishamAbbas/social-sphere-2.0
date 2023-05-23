import { useState } from "react";
import {
  createStyles,
  Menu,
  Avatar,
  UnstyledButton,
  Group,
  Text,
} from "@mantine/core";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  user: {
    color: theme.colors.dark[0],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor: theme.colors.dark[8],
    },
  },
  userActive: {
    backgroundColor: theme.colors.dark[8],
  },
}));
const UserMenu = () => {
  const { user, openUserProfile, signOut } = useClerk();
  const { classes, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: "pop-top-right" }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton
          className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
        >
          <Group spacing={7}>
            <Text weight={500} className="hidden lg:block" mr={2}>
              {user?.username}
            </Text>
            <Avatar
              src={user?.profileImageUrl}
              alt={user?.username as string}
              radius="xl"
            />

            <ChevronDown />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>{user?.primaryEmailAddress?.emailAddress}</Menu.Label>

        <Link className="no-underline" href="/profile/ee">
          <Menu.Item icon={<User size={20} />}>Profile</Menu.Item>
        </Link>
        <Menu.Item
          icon={<Settings size={20} />}
          onClick={() => openUserProfile()}
        >
          Account settings
        </Menu.Item>

        <Menu.Item
          icon={<LogOut size={20} />}
          color="red"
          onClick={() => void signOut()}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserMenu;

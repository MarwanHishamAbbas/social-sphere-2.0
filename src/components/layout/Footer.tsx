import { createStyles, Container, Group, ActionIcon, rem } from "@mantine/core";
import { Twitter, Youtube, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: rem(120),
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    backgroundColor: theme.colors.dark[7],
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

export function Footer() {
  const { classes } = useStyles();

  return (
    <Container size={"md"} className={classes.inner}>
      <Link href="/">
        <Image
          className="md:hidden"
          src="/logo.svg"
          alt="Logo"
          width={45}
          height={45}
          quality={100}
          priority
        />
        <Image
          className="hidden h-1/2 w-1/2 md:block"
          src="/brand.svg"
          alt="Brand"
          width={1000}
          height={1000}
          quality={100}
          priority
        />
      </Link>
      <Group spacing={0} className={classes.links} position="right" noWrap>
        <ActionIcon size="lg">
          <Twitter size="1.05rem" />
        </ActionIcon>
        <ActionIcon size="lg">
          <Youtube size="1.05rem" />
        </ActionIcon>
        <ActionIcon size="lg">
          <Instagram size="1.05rem" />
        </ActionIcon>
      </Group>
    </Container>
  );
}

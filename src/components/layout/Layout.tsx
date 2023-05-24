import { type ReactNode } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Aside,
  Text,
  MediaQuery,
  useMantineTheme,
  Container,
} from "@mantine/core";
import { HeaderMegaMenu } from "../common/HeaderMegaMenu";
import { Notifications } from "@mantine/notifications";
import { Footer } from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  const theme = useMantineTheme();

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colors.dark[8],
        },
      }}
      navbar={
        <Navbar
          p="xl"
          className="hidden 2xl:block"
          width={{ sm: 200, lg: 300 }}
        >
          <Text></Text>
        </Navbar>
      }
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Aside
            p="xl"
            className="hidden 2xl:block"
            width={{ sm: 200, lg: 300 }}
          >
            <Text></Text>
          </Aside>
        </MediaQuery>
      }
      header={
        <Header height={100} className="px-3 lg:px-20">
          <HeaderMegaMenu />
        </Header>
      }
      footer={<Footer />}
    >
      <Notifications />
      <Container mb={40}>{children}</Container>
    </AppShell>
  );
}

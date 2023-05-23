import { type AppType } from "next/app";

import { api } from "~/utils/api";

import { Container, MantineProvider, useMantineTheme } from "@mantine/core";
import { ClerkProvider } from "@clerk/nextjs";
import "~/styles/globals.css";
import { dark } from "@clerk/themes";
import { HeaderMegaMenu } from "~/components/common/HeaderMegaMenu";

const MyApp: AppType = ({ Component, pageProps }) => {
  const theme = useMantineTheme();
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        primaryColor: "blue",
        colorScheme: "dark",
      }}
    >
      <ClerkProvider
        appearance={{
          baseTheme: dark,
          variables: {
            colorPrimary: theme.colors.blue["9"],
            colorBackground: theme.colors.dark["7"],
          },
        }}
        {...pageProps}
      >
        <HeaderMegaMenu />
        <Container mt={30}>
          <Component {...pageProps} />
        </Container>
      </ClerkProvider>
    </MantineProvider>
  );
};

export default api.withTRPC(MyApp);

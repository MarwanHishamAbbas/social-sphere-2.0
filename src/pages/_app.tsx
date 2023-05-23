import { type AppType } from "next/app";

import { api } from "~/utils/api";

import { MantineProvider, useMantineTheme } from "@mantine/core";
import { ClerkProvider } from "@clerk/nextjs";
import "~/styles/globals.css";
import { dark } from "@clerk/themes";
import Layout from "~/components/layout/Layout";

const MyApp: AppType = ({ Component, pageProps }) => {
  const theme = useMantineTheme();
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
        components: {
          Card: {
            styles: {
              root: {
                backgroundColor: theme.colors.dark[7],
              },
            },
          },
        },
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
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ClerkProvider>
    </MantineProvider>
  );
};

export default api.withTRPC(MyApp);

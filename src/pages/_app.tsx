import { type AppType } from "next/app";

import { api } from "~/utils/api";

import { MantineProvider } from "@mantine/core";
import { ClerkProvider } from "@clerk/nextjs";
import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
      }}
    >
      <ClerkProvider {...pageProps}>
        <Component {...pageProps} />
      </ClerkProvider>
    </MantineProvider>
  );
};

export default api.withTRPC(MyApp);

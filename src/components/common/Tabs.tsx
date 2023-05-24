import { useState } from "react";
import {
  Box,
  SegmentedControl,
  Stack,
  Title,
  useMantineTheme,
} from "@mantine/core";
import CreatePostForm from "../Post/CreatePostForm";
import { useUser } from "@clerk/nextjs";
import AllPosts from "../Post/AllPosts";

const tabs = {
  explore: [
    {
      link: "",
      label: "Explore",
      component: <AllPosts />,
    },
  ],
  suggestions: [
    { link: "", label: "Suggestions", component: <h1>Suggestions Users</h1> },
  ],
  saved: [{ link: "", label: "Saved", component: <h1>Saved Posts</h1> }],
};

export function Tabs() {
  const { isSignedIn } = useUser();
  const theme = useMantineTheme();
  const [section, setSection] = useState<"explore" | "suggestions" | "saved">(
    "explore"
  );

  const links = tabs[section].map((item) => (
    <Box
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
      }}
    >
      {item.component}
    </Box>
  ));

  return (
    <Box>
      <SegmentedControl
        bg={theme.colors.dark[7]}
        value={section}
        onChange={(value: "explore" | "suggestions" | "saved") =>
          setSection(value)
        }
        transitionTimingFunction="ease"
        fullWidth
        className="mx-auto lg:w-1/2"
        data={[
          { label: "Explore", value: "explore" },
          { label: "Suggestions", value: "suggestions" },
          { label: "Saved", value: "saved" },
        ]}
      />
      {isSignedIn ? (
        <>
          <CreatePostForm />
          <Stack mt="xl">{links}</Stack>
        </>
      ) : (
        <Title size={40} mt={40} align="center">
          Sign in to use it
        </Title>
      )}
    </Box>
  );
}

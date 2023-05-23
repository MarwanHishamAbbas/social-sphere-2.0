import { useState } from "react";
import { Box, Group, SegmentedControl, useMantineTheme } from "@mantine/core";
import CreatePostForm from "../Post/CreatePostForm";
import { useUser } from "@clerk/nextjs";

const tabs = {
  explore: [
    {
      link: "",
      label: "Explore",
      component: <h1>Explore</h1>,
    },
  ],
  feed: [{ link: "", label: "Feed", component: <h1>Feed</h1> }],
  likedbyme: [{ link: "", label: "Liked By Me", component: <h1>Liked</h1> }],
};

export function Tabs() {
  const { isSignedIn } = useUser();
  const theme = useMantineTheme();
  const [section, setSection] = useState<"explore" | "feed" | "likedbyme">(
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
        onChange={(value: "explore" | "feed" | "likedbyme") =>
          setSection(value)
        }
        transitionTimingFunction="ease"
        fullWidth
        className="mx-auto lg:w-1/2"
        data={[
          { label: "Explore", value: "explore" },
          { label: "Feed", value: "feed" },
          { label: "Liked", value: "likedbyme" },
        ]}
      />
      {isSignedIn && <CreatePostForm />}
      <Group mt="xl">{links}</Group>
    </Box>
  );
}

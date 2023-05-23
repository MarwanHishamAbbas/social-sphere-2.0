import { useState } from "react";
import { Box, Group, SegmentedControl } from "@mantine/core";

const tabs = {
  explore: [
    {
      link: "",
      label: "Explore",
      component: <h1>Hello Mom</h1>,
    },
  ],
  feed: [{ link: "", label: "Feed", component: <h1>Hello Dad</h1> }],
  likedbyme: [
    { link: "", label: "Liked By Me", component: <h1>Hello Brother</h1> },
  ],
};

export function Tabs() {
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
        value={section}
        onChange={(value: "explore" | "feed" | "likedbyme") =>
          setSection(value)
        }
        transitionTimingFunction="ease"
        fullWidth
        data={[
          { label: "Explore", value: "explore" },
          { label: "Feed", value: "feed" },
          { label: "Liked", value: "likedbyme" },
        ]}
      />
      <Group mt="xl">{links}</Group>
    </Box>
  );
}

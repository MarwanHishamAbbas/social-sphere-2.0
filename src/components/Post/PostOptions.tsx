/* eslint-disable @typescript-eslint/no-misused-promises */
import { ActionIcon, Menu, useMantineTheme } from "@mantine/core";

import type { Post } from "@prisma/client";
import { Bookmark, Loader2, MoreVertical, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { api } from "~/utils/api";

export default function PostOptions({ post }: { post: Post }) {
  const theme = useMantineTheme();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const deletePost = api.post.deletePost.useMutation();
  const toggleSave = api.post.toggleSave.useMutation();
  const trpcUtils = api.useContext();

  const deletePostHandler = () => {
    setLoading(true);
    deletePost.mutate(
      { postId: post.id },
      {
        onSuccess: async () => {
          setLoading(false);
          await trpcUtils.post.invalidate();
        },
      }
    );
  };

  const toggleSaveHandler = () => {
    setSaved(!saved);
    toggleSave.mutate(
      { postId: post.id },
      {
        onSuccess: async () => {
          await trpcUtils.post.getSaved.invalidate();
        },
      }
    );
  };

  return (
    <Menu shadow="md" width={200} closeOnItemClick={false}>
      <Menu.Target>
        <ActionIcon>
          <MoreVertical size={24} color={theme.colors.dark[1]} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={toggleSaveHandler}
          icon={
            <Bookmark
              size={14}
              color={
                saved || post.saved
                  ? theme.colors.yellow[5]
                  : theme.colors.dark[1]
              }
              fill={saved || post.saved ? theme.colors.yellow[5] : ""}
            />
          }
        >
          {saved || post.saved ? "Saved" : "Save"}
        </Menu.Item>
        <Menu.Item
          onClick={deletePostHandler}
          icon={
            loading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Trash2 size={14} />
            )
          }
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

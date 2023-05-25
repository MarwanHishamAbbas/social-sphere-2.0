/* eslint-disable @typescript-eslint/no-misused-promises */
import { useUser } from "@clerk/nextjs";
import { Avatar, Button, Card, Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { Check, Send, X } from "lucide-react";
import { useState } from "react";
import { api } from "~/utils/api";

function CreatePostForm() {
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm({
    initialValues: {
      content: "",
    },
  });

  const createPost = api.post.create.useMutation();
  const trpcUtils = api.useContext();

  const createPostHandler = () => {
    if (form.values.content.length === 0) {
      notifications.show({
        title: "Post Creating Failed",
        message: "The form shouldn't be empty",
        icon: <X />,
        color: "red",
        radius: "md",
      });
      return;
    }
    if (form.values.content.length > 200) {
      notifications.show({
        title: "Post Creating Failed",
        message: "The post is too long",
        icon: <X />,
        color: "red",
        radius: "md",
      });
      return;
    }
    setLoading(true);
    createPost.mutate(
      { postContent: form.values.content },
      {
        onSuccess: async () => {
          form.reset();
          await trpcUtils.post.getAll.invalidate();
          setLoading(false);
          notifications.show({
            title: "Post Created Succesfully",
            message: "Feed will update automatically",
            icon: <Check />,
            color: "green",
            radius: "md",
          });
        },
      }
    );
  };

  return (
    <Card className="lg:p-7" withBorder>
      <form>
        <Group noWrap>
          <Avatar
            radius={"xl"}
            src={user?.profileImageUrl}
            alt={user?.username as string}
          />
          <Textarea
            {...form.getInputProps("content")}
            className="flex-grow"
            radius={"xl"}
            placeholder="What's in you mind?"
            autosize
          />
        </Group>
        <Group position="right">
          <Button
            onClick={createPostHandler}
            leftIcon={<Send size={20} />}
            className="w-full lg:w-auto"
            mt={20}
            loading={loading}
          >
            Post
          </Button>
        </Group>
      </form>
    </Card>
  );
}

export default CreatePostForm;

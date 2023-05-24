/* eslint-disable @typescript-eslint/no-misused-promises */
import { useUser } from "@clerk/nextjs";
import { Avatar, Button, Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { Check, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { api } from "~/utils/api";

function CreatePostForm({ postId }: { postId: string }) {
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm({
    initialValues: {
      content: "",
    },
  });

  const createComment = api.comment.create.useMutation();
  const trpcUtils = api.useContext();

  const createCommentHandler = () => {
    if (form.values.content.length === 0) {
      notifications.show({
        title: "Comment Creating Failed",
        message: "The form shouldn't be empty",
        icon: <X />,
        color: "red",
        radius: "md",
      });
      return;
    }
    setLoading(true);
    createComment.mutate(
      { commentContent: form.values.content, postId },
      {
        onSuccess: async () => {
          form.reset();
          await trpcUtils.comment.getAll.invalidate();
          setLoading(false);
          notifications.show({
            title: "Comment Added Succesfully",
            message: "Thanks for the comment",
            icon: <Check />,
            color: "green",
            radius: "md",
          });
        },
      }
    );
  };

  return (
    <form>
      <Group>
        <Avatar
          radius={"xl"}
          src={user?.profileImageUrl}
          alt={user?.username as string}
        />
        <Textarea
          {...form.getInputProps("content")}
          className="flex-grow"
          radius={"xl"}
          placeholder="Leave a comment"
          autosize
        />
        <Button
          onClick={createCommentHandler}
          leftIcon={<MessageCircle size={20} />}
          className="w-full lg:w-auto"
          loading={loading}
        >
          Comment
        </Button>
      </Group>
    </form>
  );
}

export default CreatePostForm;

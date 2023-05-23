import { useUser } from "@clerk/nextjs";
import { Avatar, Button, Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MessageCircle } from "lucide-react";
import { api } from "~/utils/api";

function CreateCommentForm() {
  const { user } = useUser();

  const form = useForm({
    initialValues: {
      content: "",
    },
  });

  const createPost = api.post.create.useMutation();
  const createCommentHandler = () => {
    createPost.mutate(
      { postContent: form.values.content },
      {
        onSuccess: () => {
          form.reset();
        },
      }
    );
  };

  return (
    <form>
      <Group align="center">
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
          leftIcon={<MessageCircle size={15} />}
          className="w-full lg:w-auto"
        >
          Comment
        </Button>
      </Group>
    </form>
  );
}

export default CreateCommentForm;

import { useUser } from "@clerk/nextjs";
import { Avatar, Button, Card, Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Send } from "lucide-react";
import { api } from "~/utils/api";

function CreatePostForm() {
  const { user } = useUser();

  const form = useForm({
    initialValues: {
      content: "",
    },
  });

  const createPost = api.post.create.useMutation();
  const createPostHandler = () => {
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
    <Card radius={"md"} className="mt-7 lg:p-7">
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
          >
            Post
          </Button>
        </Group>
      </form>
    </Card>
  );
}

export default CreatePostForm;

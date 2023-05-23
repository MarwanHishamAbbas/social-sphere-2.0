import { useUser } from "@clerk/nextjs";
import { Avatar, Button, Card, Group, Textarea } from "@mantine/core";
import { Send } from "lucide-react";

function CreatePostForm() {
  const { user } = useUser();

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
            className="flex-grow"
            radius={"xl"}
            placeholder="What's in you mind?"
            autosize
          />
        </Group>
        <Group position="right">
          <Button
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

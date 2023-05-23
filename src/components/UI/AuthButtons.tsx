import { useClerk } from "@clerk/nextjs";
import { Button, Group } from "@mantine/core";

const AuthButtons = ({}) => {
  const { openSignIn, openSignUp } = useClerk();
  return (
    <Group>
      <Button onClick={() => openSignIn()} variant="default">
        Log in
      </Button>
      <Button onClick={() => openSignUp()}>Sign up</Button>
    </Group>
  );
};

export default AuthButtons;

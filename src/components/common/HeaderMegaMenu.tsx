import { Header, Group, Box, Container } from "@mantine/core";
import Image from "next/image";
import AuthButtons from "../UI/AuthButtons";
import UserMenu from "../UI/UserMenu";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export function HeaderMegaMenu() {
  const { isSignedIn } = useUser();
  return (
    <Box>
      <Header height={"auto"}>
        <Container size={"xl"} py={20}>
          <Group position="apart">
            <Link href="/">
              <Image
                className="md:hidden"
                src="/logo.svg"
                alt="Logo"
                width={45}
                height={45}
                priority
                quality={100}
              />
              <Image
                className="hidden h-1/2 w-1/2 md:block"
                src="/brand.svg"
                alt="Brand"
                width={0}
                height={0}
                priority
                quality={100}
              />
            </Link>
            {isSignedIn ? <UserMenu /> : <AuthButtons />}
          </Group>
        </Container>
      </Header>
    </Box>
  );
}

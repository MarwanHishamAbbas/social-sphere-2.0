/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import logo from "../../../public/logo.svg";
import brand from "../../../public/brand.svg";

import { Group } from "@mantine/core";
import Image from "next/image";
import AuthButtons from "../UI/AuthButtons";
import UserMenu from "../UI/UserMenu";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export function HeaderMegaMenu() {
  const { isSignedIn } = useUser();
  return (
    <Group position="apart" w="100%" h="100%">
      <Link href="/">
        <Image
          className="md:hidden"
          src={logo}
          alt="Logo"
          width={45}
          height={45}
          quality={100}
          priority
        />
        <Image
          className="hidden h-1/2 w-1/2 md:block"
          src={brand}
          alt="Brand"
          width={1000}
          height={1000}
          quality={100}
          priority
        />
      </Link>

      {isSignedIn ? <UserMenu /> : <AuthButtons />}
    </Group>
  );
}

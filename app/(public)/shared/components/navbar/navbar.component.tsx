import Image from "next/image";

import {
  NavBarContainer,
  Link,
  LinksList,
  AuthContainer,
  AuthLink,
  ImageLink,
} from "./navbar.styles";
import { auth0 } from "@/app/lib/auth0";
import NavBarClient from "./navbarClient/navbar.client";

export default async function NavBar() {
  const session = await auth0.getSession();
  
  const authenticated = !!session;
  const isAdmin = session?.user?.roles.includes('admin'); 

  return (
    <NavBarContainer>
      <ImageLink href="/">
        <Image
          src="/media/logo-inverted.png"
          alt="The Not Project Logo"
          fill
          sizes="120px"
          priority 
        />
      </ImageLink>

      <NavBarClient authenticated={authenticated} isAdmin={isAdmin} />

      <LinksList>
        <Link href="/stories">Stories</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        {authenticated && <Link href="/profile">Profile</Link>}
        {isAdmin && <Link href="/admin">Admin</Link>}
      </LinksList>

      <AuthContainer className="desktop">
        <AuthLink href={`/auth/${authenticated ? "logout" : "login"}`}>
          {authenticated ? "Sign Out" : "Sign In"}
        </AuthLink>
      </AuthContainer>
    </NavBarContainer>
  );
}
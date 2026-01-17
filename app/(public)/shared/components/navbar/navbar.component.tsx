"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  NavBarContainer,
  AuthLink,
  Link,
  MenuIcon,
  LinksList,
  AuthContainer,
  ImageLink,
  MobileMenu,
} from "./navbar.styles";
import { FiX as X } from "react-icons/fi";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useNavbarTransparency } from "@/app/hooks/useNavbarTransparency";

export default function NavBar() {
  const { user, isLoading } = useUser();
  const [mounted, setMounted] = useState(false);

  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useNavbarTransparency();

  const openMenu = () => (document.body.dataset.menuOpen = String(true));
  const closeMenu = () => (document.body.dataset.menuOpen = String(false));

  useEffect(() => {
    if (isLoading) return;

    if (user) {
      setAuthenticated(true);
      fetch("/api/auth/is-admin", {
        method: "POST",
        body: JSON.stringify({ userId: user.sub }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => setIsAdmin(data.isAdmin))
        .catch(() => setIsAdmin(false));
    } else {
      setAuthenticated(false);
      setIsAdmin(false);
    }

    const handleScroll = () => {
      if (window.scrollY > 0) {
        closeMenu();
      }
    };

    window.addEventListener("scroll", handleScroll);
    setMounted(true);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [user, isLoading]);

  if (!mounted) return <div style={{ height: '70px', background: '#0d0d0d' }} />;

  return (
    <NavBarContainer>
      <ImageLink href="/">
        <Image
          src="/media/logo-inverted.png"
          alt="The Not Project Logo"
          fill
          sizes="120px"
        />
      </ImageLink>
      <MenuIcon
        className="menu-open-icon"
        onClick={openMenu}
        width="18"
        height="8"
        viewBox="0 0 18 8"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <line x1="0" y1="1" x2="18" y2="1"></line>
        <line x1="0" y1="7" x2="18" y2="7"></line>
      </MenuIcon>

      <MobileMenu>
        <X className="close" onClick={closeMenu} />
        <Link href="/" onClick={closeMenu}>
          Home
        </Link>
        {isAdmin && (
          <Link href="/admin" onClick={closeMenu}>
            Admin
          </Link>
        )}
        {authenticated && (
          <Link href="/profile" onClick={closeMenu}>
            Profile
          </Link>
        )}
        <Link href="/stories" onClick={closeMenu}>
          Stories
        </Link>
        <Link href="/about" onClick={closeMenu}>
          About
        </Link>
        <Link href="/contact" onClick={closeMenu}>
          Contact
        </Link>
        <AuthContainer>
          <AuthLink href={`/api/auth/${authenticated ? "logout" : "login"}`}>
            {authenticated ? "Sign Out" : "Sign In"}
          </AuthLink>
        </AuthContainer>
      </MobileMenu>

      <LinksList>
        <Link href="/stories" onClick={closeMenu}>
          Stories
        </Link>
        <Link href="/about" onClick={closeMenu}>
          About
        </Link>
        <Link href="/contact" onClick={closeMenu}>
          Contact
        </Link>
        {authenticated && (
          <Link href="/profile" onClick={closeMenu}>
            Profile
          </Link>
        )}
      </LinksList>
      <AuthContainer className="desktop">
        <AuthLink href={`/api/auth/${authenticated ? "logout" : "login"}`}>
          {authenticated ? "Sign Out" : "Sign In"}
        </AuthLink>
      </AuthContainer>
    </NavBarContainer>
  );
}

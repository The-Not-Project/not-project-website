"use client";

import { useEffect } from "react";
import { FiX as X } from "react-icons/fi";
import { useNavbarTransparency } from "@/app/hooks/useNavbarTransparency";
import {
  MenuIcon,
  MobileMenu,
  Link,
  AuthContainer,
  AuthLink,
} from "../navbar.styles";

interface NavBarClientProps {
  authenticated: boolean;
  isAdmin: boolean;
}

export default function NavBarClient({ authenticated, isAdmin }: NavBarClientProps) {
  useNavbarTransparency();

  const openMenu = () => (document.body.dataset.menuOpen = String(true));
  const closeMenu = () => (document.body.dataset.menuOpen = String(false));

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        closeMenu();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
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
        <Link href="/" onClick={closeMenu}>Home</Link>
        {isAdmin && <Link href="/admin" onClick={closeMenu}>Admin</Link>}
        {authenticated && <Link href="/profile" onClick={closeMenu}>Profile</Link>}
        <Link href="/stories" onClick={closeMenu}>Stories</Link>
        <Link href="/about" onClick={closeMenu}>About</Link>
        <Link href="/contact" onClick={closeMenu}>Contact</Link>
        <AuthContainer>
          <AuthLink href={`/auth/${authenticated ? "logout" : "login"}`}>
            {authenticated ? "Sign Out" : "Sign In"}
          </AuthLink>
        </AuthContainer>
      </MobileMenu>
    </>
  );
}
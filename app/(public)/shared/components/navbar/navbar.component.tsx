"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import useHeaderScroll from "@/app/hooks/useHeaderScroll";
import { useStore } from "@/app/zustand/store";
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

export default function NavBar() {
  const { user, isLoading } = useUser();

  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const pathname = usePathname();

  const { transparency } = useHeaderScroll();
  const isSpecialPage = pathname == "/";

  const isBgSolid = isSpecialPage && !transparency;

  const isMobile = useStore((state) => state.mobileLayout.isMobile);
  const isMenuOpen = useStore((state) => state.mobileLayout.isMenuOpen);
  const setIsMenuOpen = useStore((state) => state.mobileLayout.setIsMenuOpen);

  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading]);

  const navContainerClass = isBgSolid
    ? "solid isSpecialPage"
    : isSpecialPage
      ? "isSpecialPage"
      : undefined;
  const solidClass = isBgSolid ? "solid" : undefined;

  return (
    <NavBarContainer
      className={`${navContainerClass} ${isMenuOpen && "shifted"}`}
    >
      <ImageLink href="/" className="grow">
        <Image
          src="/media/logo-inverted.png"
          alt="The Not Project Logo"
          width={120}
          height={68}
        />
      </ImageLink>
      {isMobile ? (
        <>
          {!isMenuOpen && (
            <MenuIcon
              onClick={() => setIsMenuOpen(true)}
              width="18"
              height="8"
              viewBox="0 0 18 8"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="0" y1="1" x2="18" y2="1"></line>
              <line x1="0" y1="7" x2="18" y2="7"></line>
            </MenuIcon>
          )}
          <MobileMenu>
            <X className="close" onClick={() => setIsMenuOpen(false)} />
            <Link
              href="/"
              className={solidClass}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {isAdmin && (
              <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
                Admin
              </Link>
            )}
            {authenticated && (
              <Link
                href="/profile"
                className={solidClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            )}
            <Link
              href="/stories"
              className={solidClass}
              onClick={() => setIsMenuOpen(false)}
            >
              Stories
            </Link>
            <Link
              href="/about"
              className={solidClass}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={solidClass}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <AuthContainer>
              <AuthLink
                href="/api/auth/login"
                className={`${solidClass} bottom`}
              >
                {authenticated ? "Sign Out" : "Sign In"}
              </AuthLink>
            </AuthContainer>
          </MobileMenu>
        </>
      ) : (
        <>
          <LinksList className={isMenuOpen ? "open" : undefined}>
            <Link
              href="/stories"
              className={solidClass}
              onClick={() => setIsMenuOpen(false)}
            >
              Stories
            </Link>
            <Link
              href="/about"
              className={solidClass}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={solidClass}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            {authenticated && (
              <Link
                href="/profile"
                className={solidClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            )}
          </LinksList>
          <AuthContainer>
            <AuthLink href="/api/auth/login" className={`${solidClass} bottom`}>
              {authenticated ? "Sign Out" : "Sign In"}
            </AuthLink>
          </AuthContainer>
        </>
      )}

      {/* {authenticated ? (
          <ProfileDropdown
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            {!isMobile ? (
              <>
                <ProfileIcon />
                <Dropdown className={clsx({ closed: !isDropdownOpen })}>
                  <p>My Account</p>
                  {isAdmin && <Link href="/admin">Admin</Link>}
                  <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                    Profile
                  </Link>
                  <AuthLink href="/api/auth/logout">Log Out</AuthLink>
                </Dropdown>
              </>
            ) : (
              <Dropdown>
                <Link
                  href="/profile"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ProfileIcon />
                </Link>
                <AuthLink
                  href="/api/auth/logout"
                  className={clsx(solidClass, "mobile")}
                >
                  Log Out
                </AuthLink>
              </Dropdown>
            )}
          </ProfileDropdown>
        ) : ( */}

      {/* <DonateButton
          className={solidClass}
          onClick={() => router.push('/donate')}
          >
          DONATE
          </DonateButton> */}
    </NavBarContainer>
  );
}

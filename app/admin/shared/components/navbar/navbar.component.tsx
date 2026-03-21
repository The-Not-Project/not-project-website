"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavBarContainer } from "./navbar.styles";

export default function NavBar() {
  const pathname = usePathname();

  const paths = [
    { href: "/admin/personal-info", label: "Personal Info" },
    { href: "/admin/categories", label: "Categories" },
    { href: "/admin/stories", label: "Stories" },
    { href: "/admin/recommendations", label: "Recommendations" },
    { href: "/admin/radar", label: "Radar" },
    { href: "/admin/users", label: "Users" },
  ];

  return (
    <NavBarContainer>
      <ul>
        {paths.map((item) => (
          <li key={item.href}>
            <Link
              className={pathname === item.href ? "active" : ""}
              href={item.href}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </NavBarContainer>
  );
}

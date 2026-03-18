import Link from "next/link";

export default function AuthRedirect({ href }: { href: string }) {
  const isSignIn = href === "/signin";
  return (
    <p className="redirect">
      {`${isSignIn ? "Alread" : "Don't"} have an account? `}
      <Link href={href}>Sign {isSignIn ? "in" : "up"}</Link>
    </p>
  );
}

import StyledComponentsRegistry from "@/lib/styled-registry";
import { AuthContainer, Background, PageContainer } from "./styles";
import Link from "next/link";
import Image from "next/image";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyledComponentsRegistry>
      <PageContainer>
        <Background />
        <AuthContainer>
          <Link href="/">
            <Image src="/media/logo.png" height={30} width={50} alt="logo" />
          </Link>
          {children}
        </AuthContainer>
      </PageContainer>
    </StyledComponentsRegistry>
  );
}

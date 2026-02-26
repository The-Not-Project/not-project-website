import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth0 } from "../../lib/auth0";
import { AdminContainer } from "./shared/components/layout/layout.styles";
import NavBar from "./shared/components/navbar/navbar.component";
import Back from "./shared/components/backButton/backButton.component";
import "@/lib/tiptap/styles/_variables.scss";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: 'Admin | The Not Project',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth0.getSession();

  if (!session?.user.roles.includes("admin")) {
    redirect("/auth/login");
  }

  return (
    <AdminContainer>
      <Back />
      <div className="admin-content">
        <h1 className="page-title">The Not Project - Admin Page</h1>
        <NavBar />
        {children}
      </div>
    </AdminContainer>
  );
}

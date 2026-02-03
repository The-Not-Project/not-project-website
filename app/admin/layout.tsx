import { auth0 } from '../lib/auth0';
import { redirect } from 'next/navigation';
import NavBar from './shared/components/navbar/navbar.component';
import { AdminContainer } from './shared/components/layout/layout.styles';
import Back from './shared/components/backButton/backButton.component';

import "@/app/tiptap/styles/_variables.scss";


export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

    const session = await auth0.getSession();

  if (!session?.user.roles.includes('admin')) {
    redirect("/auth/login");
  }


  return (
      <AdminContainer>
        <Back />
        <div className='admin-content'>
          <h1>The Not Project - Admin Page</h1>
          <NavBar />
          {children}
        </div>
      </AdminContainer>
  );
}

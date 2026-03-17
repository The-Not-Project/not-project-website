import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PageContainer } from "../styles";

export default async function UnsubscribeSuccessPage() {  
    const cookieStore = await cookies();
  const hasAccess = cookieStore.has("unsub_success");

  if (!hasAccess) {
    redirect("/unsubscribe");
  }
  return (
    <PageContainer>
      <h1>You’ve been unsubscribed</h1>
      <h2>You won't be hearing from The Not Project.</h2>
    </PageContainer>
  );
}
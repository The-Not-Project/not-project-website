import { Suspense } from "react";
import ResetPasswordForm from "./reset-password-form";

export default function Page() {
  return (
    <>
      <h1>Enter new password</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </>
  );
}
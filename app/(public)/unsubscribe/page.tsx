"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteSubscriberAction } from "@/lib/core-api/actions/user.actions";
import { PageContainer, UnsubscribeButton, UnsubscribeInput } from "./styles";
import { FormLabel } from "../profile/personal-info/personal-info.styles";

export default function UnsubscribePage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await deleteSubscriberAction(email);
      router.push("/unsubscribe/success");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <h1>We're sorry to see you go</h1>
      <h2>Enter your email to stop receiving our updates.</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <FormLabel htmlFor="email">Email Address</FormLabel>
          <UnsubscribeInput
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
          />
          {error && (
            <p>
              {error}
            </p>
          )}
        </div>
        <UnsubscribeButton
          type="submit"
          disabled={loading}
        >
          {loading ? "Processing..." : "Unsubscribe"}
        </UnsubscribeButton>
      </form>
    </PageContainer>
  );
}
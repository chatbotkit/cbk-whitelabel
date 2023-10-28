"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");
    if (sessionId === null) {
      router.push("/");
    }
    async function getSession() {
      const res = await fetch(`/api/stripe/session?session_id=${sessionId}`);

      if (res.ok) {
        const data = await res.json();
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      }
    }
    getSession();
  }, []);

  if (status === "open") {
    return router.push("/pricing");
  }

  if (status === "complete") {
    return (
      <section className="flex flex-col items-center justify-center h-screen max-w-3xl mx-auto">
        <p className="text-center">
          We appreciate your business!If you have any questions, please email
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    );
  }

  return null;
}

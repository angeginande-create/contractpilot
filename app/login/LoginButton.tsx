"use client";

import { signIn } from "next-auth/react";

export default function LoginButton() {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      className="rounded-2xl bg-slate-950 px-8 py-4 font-semibold text-white"
    >
      Continue with Google
    </button>
  );
}
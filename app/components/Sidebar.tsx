"use client";

import { signOut } from "next-auth/react";

import Link from "next/link";


export default function Sidebar({
  contractsCount,
}: {
  contractsCount: number;
}) {
  return (
    <aside className="w-64 min-h-screen bg-slate-950 text-white flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold">
          ContractPilot
        </h1>

        <p className="text-slate-400 text-sm mt-1">
          Freelance Contracts
        </p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <Link
          href="/dashboard"
          className="block rounded-xl px-4 py-3 hover:bg-slate-800"
        >
          Dashboard
        </Link>

        <Link
          href="/wizard"
          className="block rounded-xl px-4 py-3 hover:bg-slate-800"
        >
          Create Contract
        </Link>

        <Link
          href="/pricing"
          className="block rounded-xl px-4 py-3 hover:bg-slate-800"
        >
          Billing
        </Link>

        <Link
          href="/settings"
          className="block rounded-xl px-4 py-3 hover:bg-slate-800"
        >
          Settings
        </Link>
      </nav>

      <div className="border-t border-slate-800 p-4">
        <button
  onClick={() => signOut({ callbackUrl: "/login" })}
  className="w-full rounded-xl bg-red-600 py-3 font-semibold hover:bg-red-700"
>
  Logout
</button>
      </div>
    </aside>
  );
}
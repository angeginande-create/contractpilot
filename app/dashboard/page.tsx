import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getServerSession();

if (!session?.user?.email) {
  return (
    <main className="p-10">
      <h1>Please sign in</h1>
    </main>
  );
}
const user = await prisma.user.findUnique({
  where: {
    email: session.user.email,
  },
});
if (!user) {
  return (
    <main className="p-10">
      <h1>User not found</h1>
    </main>
  );
}
  const contracts = await prisma.contract.findMany({
   where: {
    userId: user.id,
  },
  orderBy: {
    createdAt: "desc",
    },
  });
  const totalContracts = contracts.length;

const totalValue = contracts.reduce(
  (sum: number, contract: any) =>
    sum + Number(contract.projectValue || 0),
  0
);

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

const contractsThisMonth = contracts.filter((contract: any) => {
  const date = new Date(contract.createdAt);

  return (
    date.getMonth() === currentMonth &&
    date.getFullYear() === currentYear
  );
}).length;

const chartData = contracts.slice(0, 6).reverse();

const maxValue = Math.max(
  ...chartData.map((contract: any) => Number(contract.projectValue))
);
  return (
    <main className="min-h-screen bg-slate-50 p-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold text-slate-950">
              ContractPilot Dashboard
            </h1>
           <div className="mt-8 grid gap-6 lg:grid-cols-5">
  <div className="col-span-1 rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
    <p className="text-sm font-medium text-slate-500">
      Total Contracts
    </p>

    <h2 className="mt-3 text-5xl font-bold text-slate-950">
      {totalContracts}
    </h2>

    <p className="mt-2 text-sm text-green-600">
      Active agreements
    </p>
  </div>

  <div className="col-span-1 rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
    <p className="text-sm font-medium text-slate-500">
      Total Value
    </p>

    <h2 className="mt-3 text-5xl font-bold text-slate-950">
      ${totalValue.toLocaleString()}
    </h2>

    <p className="mt-2 text-sm text-slate-500">
      Contract volume
    </p>
  </div>

  <div className="col-span-1 rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
    <p className="text-sm font-medium text-slate-500">
      This Month
    </p>

    <h2 className="mt-3 text-5xl font-bold text-slate-950">
      {contractsThisMonth}
    </h2>

    <p className="mt-2 text-sm text-slate-500">
      New contracts
    </p>
  </div>

  <div className="col-span-1 rounded-3xl bg-slate-950 p-6 shadow-sm">
    <p className="text-sm font-medium text-slate-400">
      Average Deposit
    </p>

    <h2 className="mt-3 text-5xl font-bold text-white">
      {Math.round(
        contracts.reduce(
          (sum: number, c: any) => sum + c.deposit,
          0
        ) / Math.max(contracts.length, 1)
      )}
      %
    </h2>

    <p className="mt-2 text-sm text-slate-400">
      Across all contracts
    </p>
  </div>
</div>
          
          </div>

         <Link
  href="/wizard"
  className="col-span-1 flex h-full min-h-[145px] items-center justify-center rounded-3xl bg-slate-950 p-6 text-center text-2xl font-bold text-white shadow-sm"
>
  New Contract
</Link>
        </div>

        <div className="grid gap-6">
          {contracts.length === 0 && (
  <div className="mt-12 rounded-3xl border bg-white p-12 text-center">
    <h2 className="text-2xl font-bold">
      No contracts yet
    </h2>

    <p className="mt-3 text-slate-500">
      Create your first freelance contract.
    </p>

    <Link
      href="/wizard"
      className="mt-6 inline-flex rounded-2xl bg-slate-950 px-6 py-3 text-white"
    >
      Create Contract
    </Link>
  </div>
)}

<div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
  <div className="flex items-center justify-between">
    <div>
      <h2 className="text-2xl font-bold text-slate-950">
        Revenue Overview
      </h2>

      <p className="mt-2 text-slate-500">
        Contract value trend across recent agreements.
      </p>
    </div>

    <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
      Last {chartData.length} contracts
    </span>
  </div>

  <div className="mt-8 flex h-64 items-end gap-4 border-b border-slate-200 pb-4">
    {chartData.length === 0 ? (
      <div className="flex h-full w-full items-center justify-center text-slate-400">
        No revenue data yet
      </div>
    ) : (
      chartData.map((contract: any) => {
        const height = Math.max(
          (Number(contract.projectValue) / maxValue) * 100,
          8
        );

        return (
          <div
            key={contract.id}
            className="flex flex-1 flex-col items-center justify-end gap-3"
          >
            <div className="text-sm font-semibold text-slate-600">
              ${Number(contract.projectValue).toLocaleString()}
            </div>

            <div
              className="w-full rounded-t-2xl bg-slate-950"
              style={{ height: `${height}%` }}
            />

            <div className="text-xs text-slate-400">
              {new Date(contract.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        );
      })
    )}
  </div>
</div>
<div className="mt-8 mb-6 flex items-center justify-between">
  <h2 className="text-2xl font-bold text-slate-950">
    Recent Contracts
  </h2>

  <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
    {contracts.length} contracts
  </span>
</div>
          {contracts.map((contract: any) => (
            <div
  key={contract.id}
  className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
>
  <div className="mb-6 inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
    Active
  </div>

  <h3 className="text-3xl font-bold text-slate-950">
    {contract.freelancerType.toUpperCase()} AGREEMENT
  </h3>
<p className="mt-3 text-slate-500">
  Generated with ContractPilot
</p>
  <p className="mt-2 text-sm text-slate-400">
    Contract ID: {contract.contractId}
  </p>

  <div className="mt-8 grid gap-6 md:grid-cols-3">
    <div>
      <p className="text-sm text-slate-500">Client</p>
      <p className="mt-1 text-xl font-bold text-slate-950">
        {contract.clientName}
      </p>
    </div>

    <div>
      <p className="text-sm text-slate-500">Value</p>
      <p className="mt-1 text-xl font-bold text-slate-950">
        ${Number(contract.projectValue).toLocaleString()}
      </p>
    </div>

    <div>
      <p className="text-sm text-slate-500">Deposit</p>
      <p className="mt-1 text-xl font-bold text-slate-950">
        {contract.deposit}%
      </p>
    </div>
  </div>

  <div className="mt-8 flex gap-3">
    <Link
      href={`/dashboard/${contract.id}`}
      className="rounded-2xl bg-slate-950 px-5 py-3 font-semibold text-white"
    >
      View Details
    </Link>
  </div>
</div>
          ))}
        </div>
      </div>
    </main>
  );
}

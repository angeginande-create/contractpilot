import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/app/components/Sidebar";
import DeleteContractButton from "@/app/components/DeleteContractButton";

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    redirect("/login");
  }

  const contracts = await prisma.contract.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  const totalRevenue = contracts.reduce(
    (sum, contract) => sum + contract.projectValue,
    0
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
    <Sidebar contractsCount={contracts.length} />

    <main className="flex-1 p-10">
      <div className="mx-auto max-w-7xl">
      
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-950">
              Welcome {user.name || "back"}
            </h1>
            <p className="mt-2 text-slate-500">
              Manage your freelance contracts.
            </p>
          </div>

          <Link
            href="/wizard"
            className="rounded-2xl bg-slate-950 px-6 py-3 font-semibold text-white"
          >
            Create Contract
          </Link>
        </div>

        <div className="mb-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total Contracts</p>
            <h2 className="mt-3 text-4xl font-bold">{contracts.length}</h2>
          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total Value</p>
            <h2 className="mt-3 text-4xl font-bold">
              ${totalRevenue.toLocaleString()}
            </h2>
          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Average Contract</p>
            <h2 className="mt-3 text-4xl font-bold">
              $
              {contracts.length
                ? Math.round(totalRevenue / contracts.length).toLocaleString()
                : 0}
            </h2>
          </div>
        </div>

        <div className="rounded-3xl border bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-slate-950">
            Recent Contracts
          </h2>

  <div className="mb-6 flex items-center justify-between gap-4">
    <input
      placeholder="Search contracts..."
      className="w-full rounded-2xl border px-4 py-3 text-sm outline-none focus:border-slate-950"
    />

    <button className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white">
      Filter
    </button>
  </div>


<div className="overflow-hidden rounded-3xl border">
  <table className="w-full">
    <thead className="bg-slate-50">
      <tr>
        <th className="px-6 py-4 text-left">Client</th>
        <th className="px-6 py-4 text-left">Freelancer</th>
        <th className="px-6 py-4 text-left">Type</th>
        <th className="px-6 py-4 text-left">Value</th>
        <th className="px-6 py-4 text-left">Deposit</th>
        <th className="px-6 py-4 text-left">Status</th>
        <th className="px-6 py-4 text-left">Actions</th>
      </tr>
    </thead>

    <tbody>
      {contracts.map((contract) => (
        <tr
          key={contract.id}
          className="border-t hover:bg-slate-50"
        >
          <td className="px-6 py-4">
            {contract.clientName}
          </td>

          <td className="px-6 py-4">
            {contract.freelancerName}
          </td>

          <td className="px-6 py-4 capitalize">
            {contract.freelancerType}
          </td>

          <td className="px-6 py-4 font-semibold">
            ${contract.projectValue.toLocaleString()}
          </td>

          <td className="px-6 py-4">
            {contract.deposit}%
          </td>

          <td className="px-6 py-4">
  <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
    {contract.status}
  </span>
</td>

          <td className="px-6 py-4">
            {contract.pdfUrl && (
  <a
    href={contract.pdfUrl}
    target="_blank"
    className="rounded-xl bg-green-700 px-4 py-2 text-white"
  >
    View PDF
  </a>
)}
<DeleteContractButton id={contract.id} />
<Link
  href={`/dashboard/${contract.id}`}
  className="rounded-xl border px-4 py-2 text-sm font-semibold text-slate-700"
>
  Details
</Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

        </div>
      </div>
    </main>
  </div>
);
}
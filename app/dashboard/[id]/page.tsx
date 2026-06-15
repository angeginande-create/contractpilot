import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Sidebar from "@/app/components/Sidebar";

export default async function ContractDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return <main className="p-10">Please sign in</main>;
  }

  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return <main className="p-10">User not found</main>;
  }

  const contract = await prisma.contract.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!contract) {
    return <main className="p-10">Contract not found</main>;
  }

  const contractsCount = await prisma.contract.count({
    where: { userId: user.id },
  });

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar contractsCount={contractsCount} />

      <main className="flex-1 p-10">
        <div className="mx-auto max-w-5xl">
          <Link href="/dashboard" className="text-sm text-slate-500">
            ← Back to Dashboard
          </Link>

          <div className="mt-6 rounded-3xl border bg-white p-8 shadow-sm">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-sm font-semibold uppercase text-slate-500">
                  Contract Details
                </p>

                <h1 className="mt-2 text-4xl font-bold text-slate-950">
                  {contract.clientName}
                </h1>

                <p className="mt-2 text-slate-500">
                  Contract ID: {contract.contractId}
                </p>
              </div>

              <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
                {contract.status}
              </span>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border p-5">
                <p className="text-sm text-slate-500">Freelancer</p>
                <p className="mt-2 text-xl font-bold">
                  {contract.freelancerName}
                </p>
              </div>

              <div className="rounded-2xl border p-5">
                <p className="text-sm text-slate-500">Type</p>
                <p className="mt-2 text-xl font-bold capitalize">
                  {contract.freelancerType}
                </p>
              </div>

              <div className="rounded-2xl border p-5">
                <p className="text-sm text-slate-500">Project Value</p>
                <p className="mt-2 text-xl font-bold">
                  ${contract.projectValue.toLocaleString()}
                </p>
              </div>

              <div className="rounded-2xl border p-5">
                <p className="text-sm text-slate-500">Deposit</p>
                <p className="mt-2 text-xl font-bold">
                  {contract.deposit}%
                </p>
              </div>
            </div>

            <div className="mt-10 flex gap-3">
              {contract.pdfUrl && (
                <a
                  href={contract.pdfUrl}
                  target="_blank"
                  className="rounded-2xl bg-green-700 px-6 py-3 font-semibold text-white"
                >
                  View PDF
                </a>
              )}

              <Link
                href="/dashboard"
                className="rounded-2xl border px-6 py-3 font-semibold"
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
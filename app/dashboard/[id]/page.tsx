import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ContractDetailPage({ params }: PageProps) {
  const { id } = await params;

  const session = await getServerSession();

  if (!session?.user?.email) {
    return (
      <main className="min-h-screen bg-slate-50 p-10">
        <h1 className="text-3xl font-bold">Please sign in</h1>
      </main>
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    return notFound();
  }

  const contract = await prisma.contract.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!contract) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 p-10">
      <div className="mx-auto max-w-5xl">
        <Link href="/dashboard" className="text-sm font-semibold text-slate-500">
          ← Back to Dashboard
        </Link>

        <div className="mt-8 rounded-3xl border bg-white p-10 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
            Contract Details
          </p>

          <h1 className="mt-3 text-5xl font-bold text-slate-950">
            {contract.freelancerName}
          </h1>
          <div className="mt-4 flex flex-wrap gap-3">
  <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
    Active Contract
  </span>

  <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
    {contract.freelancerType}
  </span>
</div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Info label="Client" value={contract.clientName} />
            <Info label="Freelancer Type" value={contract.freelancerType} />
            <Info
              label="Project Value"
              value={`$${Number(contract.projectValue).toLocaleString()}`}
            />
            <Info label="Deposit" value={`${contract.deposit}%`} />
            <Info label="Contract ID" value={contract.contractId} />
            <Info
              label="Created"
              value={new Date(contract.createdAt).toLocaleDateString()}
            />
          </div>

          <div className="mt-10 flex gap-4">
            <Link
              href="/wizard"
              className="rounded-2xl bg-slate-950 px-6 py-3 font-semibold text-white"
            >
              New Contract
            </Link>
{contract.pdfUrl && (
  <a
    href={contract.pdfUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="rounded-2xl border border-slate-300 px-6 py-3 font-semibold text-slate-700"
  >
    Download PDF
  </a>
)}
          </div>
        </div>
      </div>
    </main>
  );
}


function Info({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border bg-slate-50 p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-xl font-bold text-slate-950">{value}</p>
    </div>
  );
}
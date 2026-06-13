import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
            ContractPilot • Attorney-Informed Contract Automation
          </div>

          <h1 className="text-6xl font-black leading-tight text-slate-950">
            Generate Professional Freelance Contracts in Minutes
          </h1>

          <p className="mt-8 text-xl leading-8 text-slate-600">
            Create professional freelance agreements, assess project risk,
            generate premium PDFs, and keep every contract organized in one
            dashboard.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/wizard"
              className="rounded-2xl bg-slate-950 px-8 py-4 text-lg font-semibold text-white transition hover:opacity-90"
            >
              Create Free Contract
            </Link>

            <Link
              href="/dashboard"
              className="rounded-2xl border border-slate-300 px-8 py-4 text-lg font-semibold text-slate-700"
            >
              View Dashboard
            </Link>
          </div>

          <div className="mt-12 flex gap-8 text-sm text-slate-500">
            <span>✓ Risk Analysis</span>
            <span>✓ Premium PDFs</span>
            <span>✓ Contract Dashboard</span>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <h2 className="text-center text-4xl font-bold text-slate-950">
            Everything freelancers need
          </h2>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl border bg-white p-8">
              <h3 className="text-xl font-bold">Contract Generator</h3>
              <p className="mt-4 text-slate-600">
                Create structured freelance agreements with a guided wizard.
              </p>
            </div>

            <div className="rounded-3xl border bg-white p-8">
              <h3 className="text-xl font-bold">Risk Review</h3>
              <p className="mt-4 text-slate-600">
                Instantly identify risky contract configurations.
              </p>
            </div>

            <div className="rounded-3xl border bg-white p-8">
              <h3 className="text-xl font-bold">Premium PDFs</h3>
              <p className="mt-4 text-slate-600">
                Export professional contract documents ready to share.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="text-center text-4xl font-bold text-slate-950">
          How it works
        </h2>

        <div className="mt-16 grid gap-8 md:grid-cols-4">
          {[
            "Create Contract",
            "Answer Questions",
            "Review Risk",
            "Download PDF",
          ].map((step, index) => (
            <div
              key={step}
              className="rounded-3xl border p-8 text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 font-bold text-white">
                {index + 1}
              </div>

              <h3 className="font-bold">{step}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <h2 className="text-center text-4xl font-bold">
            Simple Pricing
          </h2>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-8 text-slate-950">
              <h3 className="text-2xl font-bold">Free</h3>
              <p className="mt-4 text-5xl font-black">$0</p>
              <p className="mt-6 text-slate-600">
                Up to 3 contracts
              </p>
            </div>

            <div className="rounded-3xl border border-white p-8">
              <h3 className="text-2xl font-bold">Pro</h3>
              <p className="mt-4 text-5xl font-black">$19</p>
              <p className="mt-6 text-slate-300">
                Unlimited contracts
              </p>
            </div>

            <div className="rounded-3xl border border-white p-8">
              <h3 className="text-2xl font-bold">Agency</h3>
              <p className="mt-4 text-5xl font-black">$49</p>
              <p className="mt-6 text-slate-300">
                Teams and advanced features
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h2 className="text-5xl font-black text-slate-950">
          Start generating contracts today
        </h2>

        <p className="mt-6 text-xl text-slate-600">
          Build professional agreements in minutes.
        </p>

        <Link
          href="/wizard"
          className="mt-10 inline-block rounded-2xl bg-slate-950 px-8 py-4 text-lg font-semibold text-white"
        >
          Create Free Contract
        </Link>
      </section>
    </main>
  );
}
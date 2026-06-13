import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-20">
      <section className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Pricing
          </p>

          <h1 className="mt-4 text-5xl font-black text-slate-950">
            Choose your ContractPilot plan
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            Start free, then upgrade when you need unlimited contracts and premium features.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <Plan
            name="Free"
            price="$0"
            description="For testing ContractPilot."
            features={[
              "3 contracts",
              "Basic dashboard",
              "PDF export",
              "Risk score",
            ]}
            button="Start Free"
            href="/wizard"
          />

          <Plan
            featured
            name="Pro"
            price="$19"
            description="For active freelancers."
            features={[
              "Unlimited contracts",
              "Premium PDF exports",
              "Contract history",
              "Priority improvements",
            ]}
            button="Upgrade to Pro"
            href="/api/stripe/checkout?plan=pro"
          />

          <Plan
            name="Agency"
            price="$49"
            description="For teams and agencies."
            features={[
              "Team-ready workspace",
              "Unlimited contracts",
              "Advanced contract management",
              "Agency features",
            ]}
            button="Upgrade to Agency"
            href="/api/stripe/checkout?plan=agency"
          />
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="text-sm font-semibold text-slate-600">
            ← Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}

function Plan({
  name,
  price,
  description,
  features,
  button,
  href,
  featured = false,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  button: string;
  href: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`rounded-[32px] border p-8 shadow-sm ${
        featured
          ? "border-slate-950 bg-slate-950 text-white"
          : "border-slate-200 bg-white text-slate-950"
      }`}
    >
      <h2 className="text-2xl font-bold">{name}</h2>

      <p className="mt-4 text-5xl font-black">
        {price}
        {price !== "$0" && <span className="text-base font-medium">/mo</span>}
      </p>

      <p className={`mt-4 ${featured ? "text-slate-300" : "text-slate-600"}`}>
        {description}
      </p>

      <ul className="mt-8 space-y-3 text-sm">
        {features.map((feature) => (
          <li key={feature}>✓ {feature}</li>
        ))}
      </ul>

      <Link
        href={href}
        className={`mt-8 block rounded-2xl px-6 py-3 text-center font-semibold ${
          featured
            ? "bg-white text-slate-950"
            : "bg-slate-950 text-white"
        }`}
      >
        {button}
      </Link>
    </div>
  );
}
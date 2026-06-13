"use client";

import { useMemo, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ContractPDF from "./ContractPDF";

type Pricing = "fixed" | "hourly";
type IP = "client" | "reuse" | "mixed";
type Revisions = "1" | "2" | "3" | "unlimited";

type FormData = {
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  freelancerName: string;
  freelancerBusiness: string;
  freelancerEmail: string;
  projectName: string;
  projectDescription: string;
  projectValue: string;
  startDate: string;
  endDate: string;
  freelancerType: string;
  pricing: Pricing | "";
  deposit: number;
  revisions: Revisions | "";
  ipOwnership: IP | "";
  clientState: string;
};

const steps = [
  "Client information",
  "Freelancer type",
  "Pricing",
  "Deposit",
  "Revisions",
  "IP ownership",
  "Client location",
  "Summary",
];

const initialData: FormData = {
  clientName: "",
  clientCompany: "",
  clientEmail: "",
  freelancerName: "",
  freelancerBusiness: "",
  freelancerEmail: "",
  projectName: "",
  projectDescription: "",
  projectValue: "",
  startDate: "",
  endDate: "",
  freelancerType: "",
  pricing: "",
  deposit: 30,
  revisions: "",
  ipOwnership: "",
  clientState: "",
};

export default function WizardPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initialData);
  const [showPreview, setShowPreview] = useState(false);

  const risk = useMemo(() => calculateRisk(data), [data]);
  const completeness = useMemo(() => calculateCompleteness(data), [data]);
  async function saveContract() {
  try {
    const response = await fetch("/api/contracts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        freelancerName: data.freelancerName,
        clientName: data.clientName,
        projectValue: Number(data.projectValue),
        deposit: Number(data.deposit),
        freelancerType: data.freelancerType,
      }),
    });

    const text = await response.text();

    if (!response.ok) {
      console.error("API error:", text);
      return;
    }

    const result = JSON.parse(text);
    console.log("Contract saved:", result);
  } catch (error) {
    console.error("Save failed:", error);
  }
}

  const isComplete = () => {
    if (step === 0) {
      return (
        data.clientName &&
        data.clientEmail &&
        data.freelancerName &&
        data.freelancerEmail &&
        data.projectName &&
        data.projectDescription &&
        data.projectValue
      );
    }

    if (step === 1) return !!data.freelancerType;
    if (step === 2) return !!data.pricing;
    if (step === 3) return data.deposit >= 0;
    if (step === 4) return !!data.revisions;
    if (step === 5) return !!data.ipOwnership;
    if (step === 6) return !!data.clientState;

    return true;
  };

  const next = () => {
    if (!isComplete()) return;
    setShowPreview(false);
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const back = () => {
    setShowPreview(false);
    setStep((s) => Math.max(s - 1, 0));
  };

  return (
    <main className="min-h-screen bg-[#F7F5F0] text-slate-950">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold text-white shadow-lg">
            CP
          </div>

          <div>
            <h1 className="text-xl font-semibold">ContractPilot</h1>
            <p className="text-xs uppercase tracking-[0.18em] text-amber-700">
              Attorney-informed contract automation
            </p>
          </div>
        </div>

        <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
          Not a law firm · No legal advice
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-8 pt-4 lg:grid-cols-[1fr_400px]">
        <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 md:p-10">
          <Progress step={step} />

          {step === 0 && (
            <StepCard
              title="Client & Project Information"
              subtitle="These details are used to generate your freelance agreement. Complete in under 3 minutes."
            >
              <TrustBlock />

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <Input label="Client name" required value={data.clientName} placeholder="Acme Inc." onChange={(v) => setData({ ...data, clientName: v })} />
                <Input label="Client company" value={data.clientCompany} placeholder="Acme Studio LLC" onChange={(v) => setData({ ...data, clientCompany: v })} />
                <Input label="Client email" required value={data.clientEmail} placeholder="client@company.com" onChange={(v) => setData({ ...data, clientEmail: v })} />
                <Input label="Freelancer name" required value={data.freelancerName} placeholder="John Doe" onChange={(v) => setData({ ...data, freelancerName: v })} />
                <Input label="Freelancer business" value={data.freelancerBusiness} placeholder="Doe Creative Studio" onChange={(v) => setData({ ...data, freelancerBusiness: v })} />
                <Input label="Freelancer email" required value={data.freelancerEmail} placeholder="john@email.com" onChange={(v) => setData({ ...data, freelancerEmail: v })} />
                <Input label="Project name" required value={data.projectName} placeholder="Website Redesign" onChange={(v) => setData({ ...data, projectName: v })} />
                <Input
                  label="Project value"
                  required
                  prefix="$"
                  value={data.projectValue}
                  placeholder="5000"
                  onChange={(v) =>
                    setData({
                      ...data,
                      projectValue: v.replace(/[^0-9]/g, ""),
                    })
                  }
                />
                <Input label="Start date" type="date" value={data.startDate} onChange={(v) => setData({ ...data, startDate: v })} />
                <Input label="End date" type="date" value={data.endDate} onChange={(v) => setData({ ...data, endDate: v })} />
              </div>

              <label className="mt-4 block">
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  Project description <span className="text-red-500">*</span>
                </span>
                <textarea
                  value={data.projectDescription}
                  onChange={(e) =>
                    setData({ ...data, projectDescription: e.target.value })
                  }
                  className="min-h-28 w-full rounded-2xl border border-slate-300 bg-white p-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  placeholder="Design and development of a marketing website, including homepage, service pages, mobile responsive layout, and basic SEO setup."
                />
              </label>
            </StepCard>
          )}

          {step === 1 && (
            <StepCard
              title="Choose your freelance category"
              subtitle="This helps us select the right contract structure."
            >
              <ChoiceGrid
                value={data.freelancerType}
                onChange={(value) => setData({ ...data, freelancerType: value })}
                options={[
                  ["designer", "Designer", "Branding, UI, graphic design"],
                  ["developer", "Developer", "Websites, apps, software"],
                  ["copywriter", "Copywriter", "Sales pages, SEO, content"],
                  ["consultant", "Consultant", "Strategy, advisory, coaching"],
                  ["social-media", "Social Media Manager", "Content planning and publishing"],
                ]}
              />
            </StepCard>
          )}

          {step === 2 && (
            <StepCard
              title="How do you charge your client?"
              subtitle="Fixed price is common, but hourly can reduce scope creep."
            >
              <ChoiceGrid
                value={data.pricing}
                onChange={(value) => setData({ ...data, pricing: value as Pricing })}
                options={[
                  ["fixed", "Fixed price", "Best when the scope is clear"],
                  ["hourly", "Hourly", "Better for flexible or evolving work"],
                ]}
              />
            </StepCard>
          )}

          {step === 3 && (
            <StepCard
              title="What deposit do you require?"
              subtitle="A deposit reduces payment risk before work begins."
            >
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div className="mb-6 flex items-end justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Deposit</p>
                    <p className="text-5xl font-semibold">{data.deposit}%</p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
                    30–50% recommended
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={data.deposit}
                  onChange={(e) =>
                    setData({ ...data, deposit: Number(e.target.value) })
                  }
                  className="w-full accent-slate-950"
                />
              </div>
            </StepCard>
          )}

          {step === 4 && (
            <StepCard
              title="How many revision rounds are included?"
              subtitle="Limiting revisions helps prevent scope creep."
            >
              <ChoiceGrid
                value={data.revisions}
                onChange={(value) =>
                  setData({ ...data, revisions: value as Revisions })
                }
                options={[
                  ["1", "1 revision", "Simple projects"],
                  ["2", "2 revisions", "Recommended default"],
                  ["3", "3 revisions", "More flexibility"],
                  ["unlimited", "Unlimited", "High risk for scope creep"],
                ]}
              />
            </StepCard>
          )}

          {step === 5 && (
            <StepCard
              title="Who owns the work after payment?"
              subtitle="This defines intellectual property ownership and usage rights."
            >
              <ChoiceGrid
                value={data.ipOwnership}
                onChange={(value) =>
                  setData({ ...data, ipOwnership: value as IP })
                }
                options={[
                  ["client", "Client owns final work", "Transfer happens after full payment"],
                  ["reuse", "Freelancer keeps reuse rights", "Useful for code, systems, methods"],
                  ["mixed", "Mixed license", "Client uses the work, freelancer may show portfolio"],
                ]}
              />
            </StepCard>
          )}

          {step === 6 && (
            <StepCard
              title="Where is your client located?"
              subtitle="US-only MVP. State rules may affect some clauses."
            >
              <ChoiceGrid
                value={data.clientState}
                onChange={(value) => setData({ ...data, clientState: value })}
                options={[
                  ["CA", "California", "More sensitive contractor rules"],
                  ["NY", "New York", "Common commercial market"],
                  ["TX", "Texas", "Business-friendly default"],
                  ["FL", "Florida", "Common freelancer client base"],
                  ["OTHER", "Other US State", "General US contract fallback"],
                ]}
              />
            </StepCard>
          )}

          {step === 7 && (
            <StepCard
              title="Contract Summary"
              subtitle="Review your information before generating the agreement."
            >
              <SummaryPanel data={data} riskScore={risk.score} />

              <button
                onClick={() => setShowPreview(true)}
                className="mt-8 w-full rounded-2xl bg-slate-950 px-6 py-4 font-semibold text-white transition hover:bg-slate-800"
              >
                Generate contract preview
              </button>

              {showPreview && <ContractPreview data={data} riskScore={risk.score} />}
            </StepCard>
          )}

          <div className="sticky bottom-0 -mx-6 mt-8 border-t border-slate-100 bg-white/95 px-6 py-4 backdrop-blur md:-mx-10 md:px-10">
            <div className="flex items-center justify-between">
              <button
                onClick={back}
                disabled={step === 0}
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Back
              </button>

              {step < steps.length - 1 ? (
                <button
                  onClick={next}
                  className="rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Continue
                </button>
              ) : (
              <PDFDownloadLink
  document={<ContractPDF data={data} />}
  fileName="contractpilot-clean-premium-agreement.pdf"
  className="rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
>
  {({ loading }) => (
  <button onClick={saveContract}>
    {loading ? "Preparing PDF..." : "Generate Premium PDF"}
  </button>
)}
</PDFDownloadLink>
              )}
            </div>

            {!isComplete() && (
              <p className="mt-3 text-sm text-amber-700">
                Please complete all required fields before continuing.
              </p>
            )}
          </div>
        </div>

        <Dashboard data={data} step={step} completeness={completeness} risk={risk} />
      </section>
    </main>
  );
}

function buildDynamicClauses(data: FormData) {
  return {
    scope: getScopeClause(data.freelancerType),
    payment: getPaymentClause(data),
    revisions: getRevisionClause(data.revisions),
    ip: getIPClause(data.ipOwnership, data.freelancerType),
  };
}

function getScopeClause(type: string) {
  const clauses: Record<string, string> = {
    designer:
      "Freelancer will provide design-related services, which may include branding, visual identity, layout design, user interface design, graphic assets, and related creative deliverables as described in the project scope.",
    developer:
      "Freelancer will provide software or web development services, which may include planning, coding, implementation, testing, deployment support, bug fixes within the agreed scope, and related technical deliverables.",
    copywriter:
      "Freelancer will provide copywriting services, which may include website copy, sales pages, email copy, advertising copy, SEO content, content strategy, or related written deliverables.",
    consultant:
      "Freelancer will provide consulting services, which may include strategic advice, analysis, recommendations, planning sessions, reports, audits, or related advisory deliverables.",
    "social-media":
      "Freelancer will provide social media management services, which may include content planning, caption writing, post scheduling, creative direction, reporting, and platform coordination.",
  };

  return clauses[type] || "Freelancer will provide the services described in the project scope.";
}

function getPaymentClause(data: FormData) {
  const pricing =
    data.pricing === "hourly"
      ? "Client shall pay Freelancer based on the agreed hourly rate and approved time worked."
      : "Client shall pay Freelancer the agreed fixed project fee for the services described in this Agreement.";

  return `${pricing}

Project Value: $${data.projectValue || "0"}.

Client shall pay a deposit equal to ${data.deposit}% of the project value before work begins. Freelancer is not required to begin work until the deposit has been received.

Unless otherwise agreed in writing, the remaining balance shall be due upon completion, delivery, or approval of the final deliverables. Late payments may delay delivery, transfer of rights, or continuation of services.`;
}

function getRevisionClause(revisions: string) {
  if (revisions === "unlimited") {
    return "This project includes unlimited revision rounds. Freelancer should be aware that unlimited revisions may increase scope creep risk. The parties should define reasonable revision boundaries in writing, including what qualifies as a revision versus a new request.";
  }

  return `This project includes ${
    revisions || "a limited number of"
  } revision round(s). A revision means a reasonable modification to work already delivered within the agreed scope. New concepts, new deliverables, strategy changes, or requests outside the original scope may require additional fees and written approval.`;
}

function getIPClause(ip: string, freelancerType: string) {
  if (ip === "client") {
    return "Upon receipt of full payment, Freelancer assigns to Client the agreed final deliverables specifically created for the project, except for Freelancer’s pre-existing materials, tools, templates, know-how, processes, and third-party materials.";
  }

  if (ip === "reuse") {
    return "Freelancer retains ownership of pre-existing materials, reusable components, processes, tools, templates, code snippets, methods, and general know-how. Client receives a license to use the final deliverables for the intended project purpose after full payment.";
  }

  if (ip === "mixed") {
    return "Client receives rights to use the final deliverables for the intended project purpose after full payment. Freelancer may display non-confidential work in a portfolio, case study, or marketing materials unless Client requests confidentiality in writing.";
  }

  if (freelancerType === "developer") {
    return "Unless otherwise agreed in writing, Client receives rights to the final project deliverables after full payment, while Freelancer retains ownership of pre-existing code, frameworks, libraries, developer tools, and reusable components.";
  }

  return "Ownership and usage rights transfer according to the selected project terms and only after full payment has been received.";
}

function TrustBlock() {
  return (
    <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700 md:grid-cols-2">
      <p>✓ Protect payments</p>
      <p>✓ Clarify ownership</p>
      <p>✓ Reduce client disputes</p>
      <p>✓ Save hours of drafting</p>
    </div>
  );
}

function Dashboard({
  data,
  step,
  completeness,
  risk,
}: {
  data: FormData;
  step: number;
  completeness: number;
  risk: ReturnType<typeof calculateRisk>;
}) {
  return (
    <aside className="h-fit space-y-5 rounded-4xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
      <div>
        <p className="mb-2 text-sm font-medium text-slate-500">Risk Score</p>
        <div className={`rounded-2xl px-4 py-4 ${risk.badgeClass}`}>
          <p className="text-sm font-bold uppercase tracking-wide">{risk.level}</p>
          <div className="mt-3 flex items-end gap-2">
            <p className="text-5xl font-semibold">{risk.score}</p>
            <p className="mb-2 text-sm">/100</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <p className="font-semibold text-slate-950">Risk explanation</p>
        <div className="mt-4 space-y-3 text-sm text-slate-600">
          {risk.reasons.map((reason) => (
            <p key={reason}>{reason.startsWith("✓") ? reason : `⚠ ${reason}`}</p>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <p className="font-semibold text-slate-950">Contract Completeness</p>
        <p className="mt-2 text-3xl font-semibold">{completeness}%</p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
          <div className="h-full rounded-full bg-slate-950" style={{ width: `${completeness}%` }} />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="font-semibold text-slate-950">Progress checklist</p>
        <div className="mt-4 space-y-3 text-sm text-slate-600">
          {steps.map((item, index) => (
            <p key={item}>{index < step ? "✓" : index === step ? "●" : "○"} {item}</p>
          ))}
        </div>
      </div>

      <LiveSummary data={data} />

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <p className="font-semibold text-slate-950">Contract Output</p>
        <div className="mt-4 space-y-3 text-sm text-slate-600">
          <p>✓ Professional title page</p>
          <p>✓ Dynamic clauses</p>
          <p>✓ Signature page</p>
          <p>✓ Pagination</p>
          <p>✓ Legal disclaimer</p>
        </div>
      </div>

      <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4 text-sm text-amber-900">
        Automated document generation only. Not legal advice.
      </div>
    </aside>
  );
}

function LiveSummary({ data }: { data: FormData }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <p className="font-semibold text-slate-950">Live Contract Summary</p>

      <div className="mt-4 space-y-3 text-sm text-slate-600">
        <SummaryLine label="Client" value={data.clientName} />
        <SummaryLine label="Freelancer" value={data.freelancerName} />
        <SummaryLine label="Project" value={data.projectName} />
        <SummaryLine label="Value" value={data.projectValue ? `$${data.projectValue}` : ""} />
        <SummaryLine label="State" value={formatValue(data.clientState)} />
      </div>
    </div>
  );
}

function SummaryLine({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="font-medium text-slate-800">{value || "Not filled yet"}</p>
    </div>
  );
}

function SummaryPanel({ data, riskScore }: { data: FormData; riskScore: number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <h3 className="text-xl font-semibold text-slate-950">
        Ready to generate contract
      </h3>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <SummaryItem label="Client" value={data.clientName} />
        <SummaryItem label="Freelancer" value={data.freelancerName} />
        <SummaryItem label="Project" value={data.projectName} />
        <SummaryItem label="Project value" value={`$${data.projectValue}`} />
        <SummaryItem label="Pricing" value={formatValue(data.pricing)} />
        <SummaryItem label="Deposit" value={`${data.deposit}%`} />
        <SummaryItem label="Revisions" value={formatValue(data.revisions)} />
        <SummaryItem label="IP ownership" value={formatValue(data.ipOwnership)} />
        <SummaryItem label="Governing state" value={formatValue(data.clientState)} />
        <SummaryItem label="Risk score" value={`${riskScore}/100`} />
      </div>
    </div>
  );
}

function Progress({ step }: { step: number }) {
  const percentage = Math.round(((step + 1) / steps.length) * 100);

  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-slate-500">
          Step {step + 1} of {steps.length}
        </p>
        <p className="text-sm font-medium text-slate-500">{steps[step]}</p>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-slate-950 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-2 text-xs font-medium text-slate-400">
        {percentage}% complete
      </p>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  prefix,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  prefix?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between text-sm font-medium text-slate-700">
        <span>
          {label} {required && <span className="text-red-500">*</span>}
        </span>
        {required && value && <span className="text-emerald-600">✓</span>}
      </span>

      <div className="relative">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
            {prefix}
          </span>
        )}

        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-2xl border border-slate-300 bg-white p-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 ${
            prefix ? "pl-8" : ""
          }`}
        />
      </div>
    </label>
  );
}

function StepCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="max-w-2xl text-4xl font-semibold tracking-tight">
        {title}
      </h2>
      <p className="mt-3 max-w-xl text-lg text-slate-500">{subtitle}</p>
      <div className="mt-8">{children}</div>
    </div>
  );
}

function ChoiceGrid({
  options,
  value,
  onChange,
}: {
  options: string[][];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-4">
      {options.map(([id, title, description]) => {
        const active = value === id;

        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`rounded-2xl border p-4 text-left transition ${
              active
                ? "border-slate-950 bg-slate-950 text-white shadow-xl shadow-slate-300"
                : "border-slate-300 bg-white hover:border-blue-600"
            }`}
          >
            <p className="text-lg font-semibold">{title}</p>
            <p className={`mt-1 text-sm ${active ? "text-slate-300" : "text-slate-500"}`}>
              {description}
            </p>
          </button>
        );
      })}
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 font-semibold capitalize text-slate-950">
        {value || "Not selected"}
      </p>
    </div>
  );
}

function ContractPreview({
  data,
  riskScore,
}: {
  data: FormData;
  riskScore: number;
}) {
  const clauses = buildDynamicClauses(data);

  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-700">
      <h3 className="mb-4 text-2xl font-semibold text-slate-950">
        Freelance Services Agreement
      </h3>
      <p><strong>Client:</strong> {data.clientName}</p>
      <p><strong>Freelancer:</strong> {data.freelancerName}</p>
      <p><strong>Project:</strong> {data.projectName}</p>
      <p><strong>Project Value:</strong> ${data.projectValue}</p>
      <p><strong>Deposit:</strong> {data.deposit}%</p>
      <p><strong>Risk Score:</strong> {riskScore}/100</p>

      <div className="mt-5 rounded-xl bg-slate-50 p-4">
        <p className="font-semibold text-slate-950">Dynamic clauses included:</p>
        <p className="mt-2">✓ {clauses.scope.slice(0, 120)}...</p>
        <p>✓ Payment terms based on your pricing model and deposit</p>
        <p>✓ Revision policy based on selected revision rounds</p>
        <p>✓ IP ownership clause based on selected ownership model</p>
      </div>

      <p className="mt-4 rounded-xl bg-amber-50 p-4 text-xs text-amber-900">
        This preview is automatically generated and is not legal advice.
      </p>
    </div>
  );
}

function calculateCompleteness(data: FormData) {
  const fields = [
    data.clientName,
    data.clientEmail,
    data.freelancerName,
    data.freelancerEmail,
    data.projectName,
    data.projectDescription,
    data.projectValue,
    data.freelancerType,
    data.pricing,
    String(data.deposit),
    data.revisions,
    data.ipOwnership,
    data.clientState,
  ];

  const completed = fields.filter(Boolean).length;
  return Math.round((completed / fields.length) * 100);
}

function calculateRisk(data: FormData) {
  let score = 0;
  const reasons: string[] = [];

  if (data.deposit >= 30) {
    reasons.push("✓ Deposit protection is enabled.");
  }

  if (data.deposit === 0) {
    score += 30;
    reasons.push("No deposit increases payment risk.");
  } else if (data.deposit < 20) {
    score += 15;
    reasons.push("Low deposit may expose you to payment delays.");
  }

  if (data.projectValue) {
    reasons.push("✓ Project value is specified.");
  }

  if (data.revisions === "unlimited") {
    score += 40;
    reasons.push("Unlimited revisions can create scope creep.");
  } else if (data.revisions) {
    reasons.push("✓ Revision limits help reduce scope creep.");
  }

  if (data.pricing === "fixed") {
    score += 10;
    reasons.push("Fixed-price projects need clear scope boundaries.");
  }

  if (data.ipOwnership === "reuse") {
    score += 15;
    reasons.push("Reuse rights should be clearly explained.");
  } else if (data.ipOwnership) {
    reasons.push("✓ Ownership structure is defined.");
  }

  if (data.clientState === "CA") {
    score += 10;
    reasons.push("California may require extra contractor care.");
  }

  if (reasons.length === 0) {
    reasons.push("✓ No major risk detected yet.");
  }

  const level =
    score <= 30
      ? "GREEN · Low risk"
      : score <= 60
      ? "YELLOW · Medium risk"
      : "RED · High risk";

  const badgeClass =
    score <= 30
      ? "bg-emerald-50 text-emerald-700"
      : score <= 60
      ? "bg-amber-50 text-amber-700"
      : "bg-red-50 text-red-700";

  return { score, level, reasons, badgeClass };
}

function formatValue(value: string) {
  if (!value) return "Not selected";

  const labels: Record<string, string> = {
    designer: "Designer",
    developer: "Developer",
    copywriter: "Copywriter",
    consultant: "Consultant",
    "social-media": "Social Media Manager",
    fixed: "Fixed",
    hourly: "Hourly",
    client: "Client owns final work",
    reuse: "Freelancer reuse rights",
    mixed: "Mixed license",
    unlimited: "Unlimited",
    CA: "California",
    NY: "New York",
    TX: "Texas",
    FL: "Florida",
    OTHER: "Other US State",
  };

  return labels[value] || value;
}
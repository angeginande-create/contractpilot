import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">
          Freelance Contract Generator
        </h1>

        <p className="text-slate-400 mb-8">
          Create a freelance contract in minutes
        </p>

        <Link
          href="/wizard"
          className="bg-white text-black px-6 py-3 rounded-xl font-semibold"
        >
          Create Contract
        </Link>
      </div>
    </main>
  );
}

"use client";

import { useRouter } from "next/navigation";

export default function DeleteContractButton({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = confirm("Delete this contract?");

    if (!confirmed) return;

    await fetch(`/api/contracts/${id}`, {
      method: "DELETE",
    });

    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-700"
    >
      Delete
    </button>
  );
}
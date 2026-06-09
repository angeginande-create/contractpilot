import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const contract = await prisma.contract.create({
      data: {
        contractId: crypto.randomUUID(),

        freelancerName: body.freelancerName,
        clientName: body.clientName,

        projectValue: Number(body.projectValue),
        deposit: Number(body.deposit),

        freelancerType: body.freelancerType,

        pdfUrl: body.pdfUrl || null,
      },
    });

    return NextResponse.json(contract);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to save contract" },
      { status: 500 }
    );
  }
}
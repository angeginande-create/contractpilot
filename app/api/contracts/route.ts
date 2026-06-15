import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { generateContractPdf } from "@/app/pdf/generate";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    const body = await req.json();
    const contractId = crypto.randomUUID();

    const pdfUrl = await generateContractPdf({
      ...body,
      contractId,
    });

const contractData = {
  contractId,
  freelancerName: body.freelancerName,
  clientName: body.clientName,
  projectValue: Number(body.projectValue),
  deposit: Number(body.deposit),
  freelancerType: body.freelancerType,
  pdfUrl,
  userId: user.id,
};

const contract = await prisma.contract.create({
  data: contractData as any,
});

    return NextResponse.json({
      success: true,
      contract,
    });
  } catch (error) {
    console.error("CREATE CONTRACT ERROR:", error);

    return NextResponse.json(
      { success: false, error: "Failed to create contract" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: true });
}
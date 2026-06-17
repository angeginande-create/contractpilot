"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import ContractPDF from "@/app/wizard/ContractPDF";

type ContractPdfButtonProps = {
  contract: {
    clientName: string;
    freelancerName: string;
    freelancerType: string;
    projectValue: number;
    deposit: number;
    contractId: string;
  };
};

export default function ContractPdfButton({ contract }: ContractPdfButtonProps) {
  const data = {
    clientName: contract.clientName,
    freelancerName: contract.freelancerName,
    freelancerType: contract.freelancerType,
    projectValue: String(contract.projectValue),
    deposit: String(contract.deposit),
    contractId: contract.contractId,
  };

  return (
    <PDFDownloadLink
      document={<ContractPDF data={data as any} />}
      fileName={`contractpilot-${contract.contractId}.pdf`}
      className="rounded-2xl bg-green-700 px-6 py-3 font-semibold text-white"
    >
      {({ loading }) => (loading ? "Preparing PDF..." : "View PDF")}
    </PDFDownloadLink>
  );
}
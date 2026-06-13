import fs from "fs";
import path from "path";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 12,
  },
  label: {
    fontSize: 10,
    color: "#64748B",
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    color: "#0F172A",
  },
});

export async function generateContractPdf(contract: {
  contractId: string;
  freelancerName: string;
  clientName: string;
  projectValue: number;
  deposit: number;
  freelancerType: string;
}) {
  const contractsDir = path.join(process.cwd(), "public", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir, { recursive: true });
  }

  const pdfPath = path.join(contractsDir, `${contract.contractId}.pdf`);

  const doc = (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>ContractPilot Agreement</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Contract ID</Text>
          <Text style={styles.value}>{contract.contractId}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Freelancer</Text>
          <Text style={styles.value}>{contract.freelancerName}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Client</Text>
          <Text style={styles.value}>{contract.clientName}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Project Value</Text>
          <Text style={styles.value}>
  ${Number(contract.projectValue || 0).toLocaleString()}
</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Deposit</Text>
          <Text style={styles.value}>{contract.deposit}%</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Freelancer Type</Text>
          <Text style={styles.value}>{contract.freelancerType}</Text>
        </View>
      </Page>
    </Document>
  );

  const blob = await pdf(doc).toBlob();
  const buffer = Buffer.from(await blob.arrayBuffer());

  fs.writeFileSync(pdfPath, buffer);

  return `/contracts/${contract.contractId}.pdf`;
}
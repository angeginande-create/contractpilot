import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { ReactNode } from "react";
import { generateContractClauses, getRiskWarnings } from "./contractClauses";

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
  pricing: string;
  deposit: number;
  revisions: string;
  ipOwnership: string;
  clientState: string;
};

const NAVY = "#0B1F44";
const GREEN = "#15803D";
const SLATE = "#475569";
const BORDER = "#D8E0EA";
const SOFT = "#F8FAFC";
const LIGHT_GREEN = "#ECFDF3";

const styles = StyleSheet.create({
  cover: {
    padding: 0,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
  },
  coverTop: {
    height: 72,
    backgroundColor: NAVY,
    paddingHorizontal: 54,
    paddingTop: 24,
  },
  brandRow: {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 50,
  paddingTop: 16,
},

brandName: {
  color: "#FFFFFF",
  fontSize: 18,
  fontWeight: "bold",
},

brandTagline: {
  color: "#DCE7F5",
  fontSize: 9.5,
},
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoBox: {
    width: 38,
    height: 38,
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  brand: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 1.4,
  },
  tagline: {
    color: "#FFFFFF",
    fontSize: 8.5,
    marginTop: 4,
  },
  coverBody: {
    paddingHorizontal: 58,
    paddingTop: 34,
  },
  coverTitle: {
    fontSize: 36,
    lineHeight: 1.1,
    fontWeight: "bold",
    color: NAVY,
  },
  accentLine: {
    width: 54,
    height: 3,
    backgroundColor: GREEN,
    marginTop: 24,
    marginBottom: 18,
  },
  intro: {
    width: 420,
    fontSize: 10.8,
    lineHeight: 1.55,
    color: "#111827",
  },
  cardGrid: {
    marginTop: 26,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  card: {
    width: 188,
    height: 78,
    borderWidth: 1,
    borderColor: "#B7DCC3",
    borderRadius: 6,
    backgroundColor: SOFT,
    padding: 12,
  },
  cardLabel: {
    fontSize: 7,
    color: GREEN,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 7,
  },
  cardValue: {
    fontSize: 11,
    color: NAVY,
    fontWeight: "bold",
  },
  coverBottom: {
    marginTop: 36,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingTop: 16,
    alignItems: "center",
  },
  coverBottomText: {
    fontSize: 10,
    color: NAVY,
    fontWeight: "bold",
  },
  coverBottomSub: {
    fontSize: 8.5,
    color: SLATE,
    marginTop: 4,
  },
  coverBar: {
    position: "absolute",
    bottom: 0,
    height: 12,
    width: "100%",
    backgroundColor: NAVY,
  },

  page: {
    paddingTop: 42,
    paddingBottom: 31,
    paddingHorizontal: 38,
    fontFamily: "Helvetica",
    color: "#111827",
    backgroundColor: "#FFFFFF",
  },
  header: {
    position: "absolute",
    top: 15,
    left: 38,
    right: 38,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    paddingBottom: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerBrand: {
    fontSize: 7.5,
    color: NAVY,
    fontWeight: "bold",
  },
  headerSub: {
    fontSize: 7,
    color: SLATE,
    marginTop: 2,
  },
  headerRight: {
    fontSize: 7.5,
    color: NAVY,
  },
  footer: {
    position: "absolute",
    bottom: 11,
    left: 38,
    right: 38,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 6.8,
    color: SLATE,
  },
  watermark: {
    position: "absolute",
    top: 310,
    left: 92,
    fontSize: 54,
    color: "#F1F5F9",
    fontWeight: "bold",
    transform: "rotate(-35deg)",
  },

  h1: {
    fontSize: 18,
    color: NAVY,
    fontWeight: "bold",
    marginBottom: 12,
  },
  tocGrid: {
    flexDirection: "row",
    gap: 28,
    marginTop: 12,
  },
  tocCol: {
    width: "48%",
  },
  tocRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  tocTitle: {
    fontSize: 9.8,
    color: NAVY,
  },
  tocDots: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#CBD5E1",
    marginHorizontal: 6,
  },
  tocPage: {
    width: 22,
    textAlign: "right",
    color: GREEN,
    fontWeight: "bold",
    fontSize: 9.8,
  },
  warningBox: {
    borderWidth: 1,
    borderColor: "#F59E0B",
    backgroundColor: "#FFFBEB",
    borderRadius: 5,
    padding: 9,
    marginTop: 18,
  },
  warningTitle: {
    fontSize: 8.8,
    fontWeight: "bold",
    color: "#92400E",
    marginBottom: 4,
  },
  warningText: {
    fontSize: 8.2,
    color: "#92400E",
    lineHeight: 1.32,
    marginBottom: 3,
  },

  clauseBlock: {
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 12.5,
    color: NAVY,
    fontWeight: "bold",
    marginTop: 6,
    marginBottom: 4,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  subSection: {
    marginBottom: 2.5,
  },
  subTitle: {
    fontSize: 9.2,
    color: NAVY,
    fontWeight: "bold",
    marginBottom: 1.5,
  },
  paragraph: {
    fontSize: 9.2,
    lineHeight: 1.28,
    color: "#111827",
    marginBottom: 1.5,
  },

  signatureSection: {
    marginTop: 18,
  },
  signatureTitle: {
    fontSize: 14,
    color: NAVY,
    fontWeight: "bold",
    marginBottom: 8,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  signatureRow: {
    flexDirection: "row",
    gap: 14,
    marginTop: 18,
  },
  signatureBox: {
    width: "48%",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 5,
    minHeight: 155,
  },
  signatureHeader: {
    backgroundColor: NAVY,
    borderBottomWidth: 2,
    borderBottomColor: GREEN,
    paddingVertical: 8,
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 8.8,
    fontWeight: "bold",
  },
  signatureContent: {
    padding: 14,
  },
  signatureLine: {
    marginTop: 16,
    fontSize: 8.8,
    borderBottomWidth: 1,
    borderBottomColor: "#94A3B8",
    paddingBottom: 3,
  },
  signatureNote: {
    marginTop: 26,
    fontSize: 8.8,
    lineHeight: 1.45,
    textAlign: "center",
    color: NAVY,
  },
});

function formatState(value: string) {
  const states: Record<string, string> = {
    CA: "California",
    NY: "New York",
    TX: "Texas",
    FL: "Florida",
    OTHER: "Other US State",
  };

  return states[value] || value || "Not selected";
}

function formatFreelancerType(value: string) {
  const labels: Record<string, string> = {
    designer: "Designer",
    developer: "Developer",
    copywriter: "Copywriter",
    consultant: "Consultant",
    "social-media": "Social Media Manager",
  };

  return labels[value] || "Freelancer";
}

function Header({ contractId }: { contractId: string }) {
  return (
    <View fixed style={styles.header}>
      <View>
        <Text style={styles.headerBrand}>ContractPilot</Text>
        <Text style={styles.headerSub}>Freelance Services Agreement</Text>
      </View>
      <Text style={styles.headerRight}>Contract ID: {contractId}</Text>
    </View>
  );
}

function Footer() {
  return (
    <View fixed style={styles.footer}>
      <Text>ContractPilot · Attorney-Informed Contract Automation</Text>
      <Text
        render={({ pageNumber, totalPages }) =>
          `Page ${pageNumber} of ${totalPages}`
        }
      />
    </View>
  );
}

function PageShell({
  children,
  contractId,
}: {
  children: ReactNode;
  contractId: string;
}) {
  return (
    <Page size="A4" style={styles.page} wrap>
      <Text fixed style={styles.watermark}>
        CONTRACTPILOT
      </Text>
      <Header contractId={contractId} />
      {children}
      <Footer />
    </Page>
  );
}

function CoverCard({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardLabel}>{label}</Text>
      <Text style={styles.cardValue}>{value}</Text>
    </View>
  );
}

function CoverPage({
  contractId,
  data,
}: {
  contractId: string;
  data: FormData;
}) {
  const projectValue = data.projectValue || "0";

  return (
    <Page size="A4" style={styles.cover}>
      <View style={styles.coverTop}>
  <View style={styles.brandRow}>
    <View style={styles.logoBox}>
      <Text style={styles.logoText}>CP</Text>
    </View>

    <View>
      <Text style={styles.brandName}>
        CONTRACTPILOT
      </Text>

      <Text style={styles.brandTagline}>
        Attorney-Informed Contract Automation
      </Text>
    </View>
  </View>
</View>

      <View style={styles.coverBody}>
        <Text style={styles.coverTitle}>
          PROFESSIONAL{"\n"}FREELANCE SERVICES{"\n"}AGREEMENT
        </Text>

        <View style={styles.accentLine} />

        <Text style={styles.intro}>
          This Professional Freelance Services Agreement is made between the
          Client and the Freelancer set forth below.
        </Text>

        <View style={styles.cardGrid}>
          <CoverCard label="Contract ID" value={contractId} />
          <CoverCard label="Generated" value={new Date().toLocaleDateString()} />
          <CoverCard label="Client" value={data.clientName || "Client"} />
          <CoverCard label="Freelancer" value={data.freelancerName || "Freelancer"} />
          <CoverCard label="Project Value" value={`$${projectValue}.00 USD`} />
          <CoverCard label="Governing State" value={formatState(data.clientState)} />
          <CoverCard
            label="Freelancer Type"
            value={formatFreelancerType(data.freelancerType)}
          />
          <CoverCard label="Deposit" value={`${data.deposit}%`} />
        </View>

        <View style={styles.coverBottom}>
          <Text style={styles.coverBottomText}>Professional Services Contract</Text>
          <Text style={styles.coverBottomSub}>Prepared Automatically</Text>
        </View>
      </View>

      <View style={styles.coverBar} />
    </Page>
  );
}

function ClauseBlock({
  number,
  title,
  subsections,
}: {
  number: string;
  title: string;
  subsections: { number: string; title: string; body: string }[];
}) {
  return (
    <View style={styles.clauseBlock}>
      <Text style={styles.sectionTitle}>
        {number}. {title.toUpperCase()}
      </Text>

      {subsections.map((subsection, index) => (
        <View
          key={`subsection-${number}-${subsection.number}-${index}`}
          style={styles.subSection}
        >
          <Text style={styles.subTitle}>
            {subsection.number} {subsection.title}
          </Text>
          <Text style={styles.paragraph}>{subsection.body}</Text>
        </View>
      ))}
    </View>
  );
}

function SignatureBlock() {
  return (
    <View style={styles.signatureSection}>
      <Text style={styles.signatureTitle}>17. SIGNATURES</Text>

      <View style={styles.signatureRow}>
        <View style={styles.signatureBox}>
          <Text style={styles.signatureHeader}>CLIENT</Text>
          <View style={styles.signatureContent}>
            <Text style={styles.signatureLine}>Signature:</Text>
            <Text style={styles.signatureLine}>Printed Name:</Text>
            <Text style={styles.signatureLine}>Title:</Text>
            <Text style={styles.signatureLine}>Date:</Text>
          </View>
        </View>

        <View style={styles.signatureBox}>
          <Text style={styles.signatureHeader}>FREELANCER</Text>
          <View style={styles.signatureContent}>
            <Text style={styles.signatureLine}>Signature:</Text>
            <Text style={styles.signatureLine}>Printed Name:</Text>
            <Text style={styles.signatureLine}>Business Name:</Text>
            <Text style={styles.signatureLine}>Date:</Text>
          </View>
        </View>
      </View>

      <Text style={styles.signatureNote}>
        By signing above, the Parties acknowledge that they have read,
        understood, and agree to be bound by this Agreement.
      </Text>
    </View>
  );
}

function TableOfContents({
  contractId,
  warnings,
}: {
  contractId: string;
  warnings: { level: string; title: string; message: string }[];
}) {
  const left = [
    ["1", "Parties", "3"],
    ["2", "Scope of Services", "3"],
    ["3", "Project Timeline", "4"],
    ["4", "Compensation & Payment", "5"],
    ["5", "Revisions", "6"],
    ["6", "Intellectual Property", "6"],
    ["7", "Client Responsibilities", "7"],
    ["8", "Acceptance Criteria", "8"],
  ];

  const right = [
    ["9", "Confidentiality", "8"],
    ["10", "Independent Contractor", "9"],
    ["11", "Warranties Disclaimer", "9"],
    ["12", "Limitation of Liability", "10"],
    ["13", "Termination", "10"],
    ["14", "Governing Law", "11"],
    ["15", "Legal Disclaimer", "11"],
    ["16", "Risk Review Notice", "11"],
    ["17", "Signatures", "12"],
  ];

  const renderRow = ([num, title, page]: string[]) => (
    <View style={styles.tocRow} key={`toc-${num}`}>
      <Text style={styles.tocTitle}>
        {num}. {title}
      </Text>
      <View style={styles.tocDots} />
      <Text style={styles.tocPage}>{page}</Text>
    </View>
  );

  return (
    <PageShell contractId={contractId}>
      <Text style={styles.h1}>TABLE OF CONTENTS</Text>

      <View style={styles.tocGrid}>
        <View style={styles.tocCol}>{left.map(renderRow)}</View>
        <View style={styles.tocCol}>{right.map(renderRow)}</View>
      </View>

      {warnings.length > 0 && (
        <View style={styles.warningBox}>
          <Text style={styles.warningTitle}>ATTORNEY REVIEW WARNINGS</Text>

          {warnings.slice(0, 4).map((warning, index) => (
            <Text
              key={`warning-${warning.title}-${index}`}
              style={styles.warningText}
            >
              {warning.level}: {warning.title} — {warning.message}
            </Text>
          ))}
        </View>
      )}
    </PageShell>
  );
}

export default function ContractPDF({ data }: { data: FormData }) {
  const contractId = `CP-${new Date().getFullYear()}-${Math.floor(
    100000 + Math.random() * 900000
  )}`;

  const clauses = generateContractClauses(data as any);
  const warnings = getRiskWarnings(data as any);

  return (
    <Document>
      <CoverPage contractId={contractId} data={data} />

      <TableOfContents contractId={contractId} warnings={warnings} />

      <PageShell contractId={contractId}>
        {clauses.map((clause: any, index: number) => (
          <ClauseBlock
            key={`clause-${clause.number}-${index}`}
            number={clause.number}
            title={clause.title}
            subsections={clause.subsections}
          />
        ))}

        <SignatureBlock />
      </PageShell>
    </Document>
  );
}
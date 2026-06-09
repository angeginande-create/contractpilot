export type FreelancerType =
  | "designer"
  | "developer"
  | "copywriter"
  | "consultant"
  | "social-media"
  | "";

export type ContractData = {
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
  freelancerType: FreelancerType;
  pricing: string;
  deposit: number;
  revisions: string;
  ipOwnership: string;
  clientState: string;
};

export type ClauseSubsection = {
  number: string;
  title: string;
  body: string;
};

export type ContractClause = {
  number: string;
  title: string;
  subsections: ClauseSubsection[];
};

export type RiskWarning = {
  level: "GREEN" | "YELLOW" | "RED";
  title: string;
  message: string;
};

export type RiskAssessment = {
  score: number;
  level: "GREEN" | "YELLOW" | "RED";
  warnings: RiskWarning[];
};

const value = (v: string, fallback: string) => v?.trim() || fallback;

const money = (v: string) => {
  const amount = Number(v || 0);
  return `$${amount.toLocaleString("en-US")}`;
};

const stateName = (state: string) => {
  const states: Record<string, string> = {
    CA: "California",
    NY: "New York",
    TX: "Texas",
    FL: "Florida",
    OTHER: "the selected U.S. state",
  };

  return states[state] || state || "the selected U.S. state";
};

export function getIndustryVariant(type: FreelancerType): ClauseSubsection[] {
  const variants: Record<string, ClauseSubsection[]> = {
    designer: [
      {
        number: "2.8",
        title: "Design Source Files",
        body:
          "Unless expressly included in writing, editable source files are not included in the standard final deliverables. Source files may include Adobe files, Figma files, Sketch files, Canva files, layered files, raw design systems, draft concepts, unused layouts, internal working files, and experimental creative directions. If Client requires editable files, the Parties should agree in writing on the specific file formats, delivery timing, permitted usage, and any additional fee. Freelancer may withhold source files until all amounts due are paid in full.",
      },
      {
        number: "2.9",
        title: "Stock Assets and Brand Materials",
        body:
          "Client is responsible for obtaining, maintaining, or reimbursing licenses for stock images, fonts, icons, templates, illustrations, plugins, music, footage, or other third-party materials used in the project unless Freelancer expressly agrees otherwise in writing. Client is also responsible for confirming that brand assets, logos, trademarks, and previously created materials provided to Freelancer are legally usable. Freelancer is not responsible for claims arising from Client-provided materials or unlicensed third-party assets.",
      },
      {
        number: "6.8",
        title: "Designer Portfolio Rights",
        body:
          "Freelancer may display non-confidential final work in a portfolio, website, case study, proposal, social media post, award submission, or marketing material unless Client requests confidentiality in writing before publication. Portfolio use does not transfer confidential information, private business data, or sensitive Client materials. If Client requires white-label treatment or complete confidentiality, the Parties should agree to those limits in writing before work begins.",
      },
    ],

    developer: [
      {
        number: "2.8",
        title: "Source Code and Repository Access",
        body:
          "If the project involves software, websites, applications, scripts, integrations, or technical implementation, the Parties should define whether source code, repository access, documentation, deployment credentials, environment variables, and technical handoff materials are included. Unless otherwise agreed in writing, Freelancer may withhold repository transfer, production credentials, deployment documentation, or final technical handoff until all amounts due are paid. Client is responsible for maintaining secure access to its own systems and accounts.",
      },
      {
        number: "2.9",
        title: "Hosting, Deployment, and Maintenance",
        body:
          "Hosting, server administration, domain management, monitoring, backups, uptime support, security updates, long-term maintenance, plugin updates, and post-launch technical support are excluded unless expressly included in the scope or agreed separately in writing. Deployment assistance may be limited to the initial launch of the agreed deliverables. Any post-launch support, maintenance window, service-level commitment, or emergency support obligation must be separately defined.",
      },
      {
        number: "6.8",
        title: "Open-Source and Third-Party Technology",
        body:
          "The project may include open-source libraries, frameworks, APIs, SDKs, hosting services, plugins, payment processors, authentication tools, analytics tools, or other third-party technologies. Such materials remain subject to their own license terms and are not owned by either Party merely because they are used in the project. Client is responsible for maintaining accounts, subscriptions, API keys, platform access, and compliance with third-party terms unless otherwise agreed in writing.",
      },
    ],

    copywriter: [
      {
        number: "2.8",
        title: "Copy Approval and Publication",
        body:
          "Client is responsible for reviewing and approving copy before publication, distribution, advertising use, or public release. Freelancer may provide messaging, positioning, drafts, headlines, sales copy, email copy, SEO content, scripts, or other written materials, but Client remains responsible for factual accuracy, legal compliance, industry-specific claims, testimonials, pricing statements, guarantees, and regulated claims. If Client edits or modifies copy after delivery, Client assumes responsibility for those changes.",
      },
      {
        number: "6.8",
        title: "Copyright and Attribution",
        body:
          "After full payment, Client receives the rights specified in the selected intellectual property model for the final approved copy. Unless otherwise agreed in writing, Freelancer may reference non-confidential work in a portfolio, case study, or marketing material. If Client requires ghostwriting, no attribution, exclusive rights, or white-label treatment, those terms should be stated in writing before publication.",
      },
      {
        number: "11.5",
        title: "SEO and Performance Disclaimer",
        body:
          "Freelancer does not guarantee search rankings, traffic, conversions, sales, email open rates, advertising performance, audience growth, revenue, platform approval, or profitability. Content performance may depend on Client’s offer, website, authority, technical SEO, competition, ad spend, market demand, platform algorithms, and ongoing distribution efforts.",
      },
    ],

    consultant: [
      {
        number: "2.8",
        title: "Advisory Nature of Services",
        body:
          "Consulting services are advisory in nature. Freelancer may provide analysis, recommendations, strategic planning, audits, workshops, reports, frameworks, or decision support, but Client remains responsible for business decisions, implementation, operations, staffing, budgeting, compliance, and results. Freelancer’s recommendations are based on the information available at the time of service and should not be treated as guaranteed outcomes.",
      },
      {
        number: "7.6",
        title: "Client Implementation Responsibility",
        body:
          "Client is responsible for deciding whether, when, and how to implement any recommendation provided by Freelancer. Freelancer is not responsible for losses arising from Client’s implementation choices, internal execution, third-party vendors, operational constraints, market conditions, or failure to follow recommendations. If implementation support is required, the Parties should define a separate scope, fee, and timeline.",
      },
      {
        number: "11.5",
        title: "No Guaranteed Business Outcome",
        body:
          "Freelancer does not guarantee revenue, profitability, investment results, fundraising outcomes, cost savings, customer acquisition, regulatory approval, operational improvement, or any specific business outcome. Consulting value depends on Client’s execution, market conditions, internal resources, management decisions, and external factors outside Freelancer’s control.",
      },
    ],

    "social-media": [
      {
        number: "2.8",
        title: "Platform Access and Scheduling",
        body:
          "Client is responsible for providing timely access to social media accounts, scheduling tools, analytics dashboards, creative assets, brand guidelines, approval workflows, and platform credentials needed to perform the services. Freelancer is not responsible for delays caused by missing access, locked accounts, platform verification issues, changed passwords, or delayed approvals.",
      },
      {
        number: "2.9",
        title: "Content Approval and Platform Risk",
        body:
          "Client is responsible for reviewing and approving content before publication unless the Parties agree to a different workflow in writing. Freelancer is not responsible for platform outages, algorithm changes, account restrictions, ad disapprovals, content removals, shadow bans, policy enforcement, follower loss, or third-party platform decisions. Posting schedules may change if platforms become unavailable or if approvals are delayed.",
      },
      {
        number: "4.9",
        title: "Ad Spend and External Costs",
        body:
          "Advertising budgets, boosted posts, influencer payments, platform fees, social media tools, content licensing, software subscriptions, and media spend are not included in Freelancer’s service fees unless expressly stated in writing. Client remains responsible for funding advertising accounts and approving campaign budgets before spend occurs.",
      },
    ],
  };

  return variants[type] || [];
}

export function generateContractClauses(data: ContractData): ContractClause[] {
  const client = value(data.clientCompany || data.clientName, "Client");
  const freelancer = value(
    data.freelancerBusiness || data.freelancerName,
    "Freelancer"
  );

  return [
    {
      number: "1",
      title: "Parties",
      subsections: [
        {
          number: "1.1",
          title: "Client",
          body: `This Agreement is entered into by and between ${client} (“Client”). Client email: ${value(
            data.clientEmail,
            "Not provided"
          )}. Client is responsible for providing accurate contact, billing, approval, and project information. If Client is acting on behalf of a company, agency, organization, or third party, Client represents that it has authority to enter into this Agreement and approve the services described below.`,
        },
        {
          number: "1.2",
          title: "Freelancer",
          body: `This Agreement is entered into with ${freelancer} (“Freelancer”). Freelancer email: ${value(
            data.freelancerEmail,
            "Not provided"
          )}. Freelancer agrees to provide professional independent contractor services as described in this Agreement. Freelancer may perform the services using reasonable professional judgment, subject to the agreed scope, timeline, deliverables, and Client responsibilities.`,
        },
        {
          number: "1.3",
          title: "Relationship of the Parties",
          body:
            "Client and Freelancer may each be referred to individually as a “Party” and collectively as the “Parties.” This Agreement governs the services, deliverables, payment obligations, intellectual property rights, confidentiality obligations, limitations of liability, and other responsibilities related to the project. The Parties intend this Agreement to create a commercial services relationship, not an employment, partnership, franchise, or agency relationship.",
        },
        {
          number: "1.4",
          title: "Authority and Approvals",
          body:
            "Each Party represents that it has authority to enter into this Agreement and perform its obligations. Client is responsible for identifying the person or team authorized to provide approvals, request revisions, accept deliverables, and communicate project decisions. If multiple stakeholders are involved, Client remains responsible for consolidating feedback and ensuring that approvals are clear, timely, and internally authorized.",
        },
      ],
    },

    {
      number: "2",
      title: "Scope of Services",
      subsections: [
        {
          number: "2.1",
          title: "Services Included",
          body: getScopeByType(data.freelancerType, data.projectName),
        },
        {
          number: "2.2",
          title: "Project Description",
          body: `The project is described as follows: ${value(
            data.projectDescription,
            "The Parties will define the project description in writing before work begins."
          )} This description forms the commercial basis of the engagement. If the description is general, incomplete, or later modified, the Parties should confirm any material changes in writing to avoid misunderstandings about deliverables, deadlines, and payment obligations.`,
        },
        {
          number: "2.3",
          title: "Deliverables",
          body:
            "Freelancer shall provide the deliverables reasonably described in the project scope. Deliverables may include written materials, design assets, software, reports, recommendations, marketing materials, content, technical implementation, or other agreed outputs depending on the project type. Deliverables do not include drafts, rejected concepts, internal notes, source files, editable working files, credentials, strategy documents, or underlying systems unless expressly included in writing.",
        },
        {
          number: "2.4",
          title: "Assumptions",
          body:
            "The scope assumes that Client will provide timely information, access, approvals, assets, and feedback. The scope also assumes that the project requirements will remain substantially consistent after work begins. If Client changes goals, target audience, technical requirements, brand direction, platform, content, decision-makers, or deliverable expectations, the project may require revised pricing, revised deadlines, or a written change order.",
        },
        {
          number: "2.5",
          title: "Client Dependencies",
          body:
            "Freelancer’s ability to perform may depend on Client-provided materials, platform access, brand guidelines, subject matter input, technical credentials, legal approvals, business decisions, or third-party cooperation. Freelancer is not responsible for delays, defects, missed deadlines, or reduced quality caused by missing, inaccurate, late, conflicting, or unauthorized Client materials. Client delays may extend the timeline without reducing payment obligations.",
        },
        {
          number: "2.6",
          title: "Change Requests",
          body:
            "A change request means any request that materially modifies the agreed scope, deliverables, assumptions, timeline, technical requirements, creative direction, strategy, platform, or volume of work. Freelancer may accept or reject change requests in its reasonable discretion. If accepted, a change request may require additional fees, revised deadlines, or a separate written agreement before Freelancer is required to proceed.",
        },
        {
          number: "2.7",
          title: "Out-of-Scope Work",
          body:
            "Any work not specifically included in the project description, proposal, or agreed deliverables is outside the scope of this Agreement. Out-of-scope work may include new deliverables, additional pages, new features, extra meetings, major redesigns, new campaigns, new concepts, new strategy requests, rush work, platform changes, or revisions beyond the included number. Out-of-scope work must be approved in writing and may be billed separately.",
        },
        ...getIndustryVariant(data.freelancerType).filter((s) =>
          s.number.startsWith("2.")
        ),
      ],
    },

    {
      number: "3",
  title: "Project Timeline",
  subsections: [
    {
      number: "3.1",
      title: "Project Schedule",
      body: "The Parties shall collaborate in good faith to establish a mutually acceptable project schedule. Estimated delivery dates, milestones, and completion targets are based on the information available at the Effective Date. Any timeline provided by Freelancer is an estimate only and may be adjusted as necessary to accommodate project complexity, revisions, dependencies, third-party delays, or circumstances outside Freelancer's reasonable control."
    },
    {
      number: "3.2",
      title: "Milestones and Deliverables",
      body: "Where applicable, the Project may be divided into milestones. Each milestone shall include specific deliverables, review periods, and payment obligations. Completion of a milestone shall be deemed achieved when the associated deliverables have been submitted to Client in the agreed format. Freelancer shall not be required to commence subsequent milestones until any required approvals, feedback, or milestone payments have been received."
    },
    {
      number: "3.3",
      title: "Client Feedback Windows",
      body: "Client agrees to review submitted work and provide feedback, approvals, requested revisions, or other responses within five (5) business days unless otherwise agreed in writing. Delays in providing feedback may result in corresponding extensions of project deadlines. Freelancer shall not be responsible for schedule impacts caused by Client's failure to provide timely responses, materials, access credentials, or approvals."
    },
    {
      number: "3.4",
      title: "Extension Requests",
      body: "Either Party may request reasonable extensions to project deadlines when unforeseen circumstances arise. Extension requests should be communicated promptly and include a description of the circumstances requiring additional time. Freelancer shall be entitled to adjust delivery dates when project scope changes, additional revisions are requested, or new requirements are introduced after work has commenced."
    },
    {
      number: "3.5",
      title: "Project Delays",
      body: "Freelancer shall not be considered in breach of this Agreement for delays resulting from Client actions, incomplete information, technical failures, third-party service interruptions, regulatory requirements, force majeure events, or circumstances beyond Freelancer's reasonable control. Any resulting delay shall automatically extend applicable deadlines by a period reasonably necessary to accommodate the disruption."
    },
    {
      number: "3.6",
      title: "Force Majeure",
      body: "Neither Party shall be liable for any delay or failure to perform caused by events beyond its reasonable control, including natural disasters, severe weather, war, terrorism, labor disputes, governmental actions, internet outages, cyber incidents, public health emergencies, utility interruptions, or failures of third-party infrastructure. The affected Party shall provide notice as soon as reasonably practicable and performance obligations shall be suspended for the duration of the force majeure event."
        },
      ],
    },

    {
      number: "4",
      title: "Compensation and Payment Terms",
      subsections: [
        {
          number: "4.1",
          title: "Project Fee",
          body: `Client shall pay Freelancer ${money(
            data.projectValue
          )} for the services described in this Agreement. If the project is fixed-price, the fee applies only to the agreed scope. If the project is hourly, the amount may be an estimate unless otherwise agreed in writing. Additional services, extra deliverables, urgent requests, expanded scope, or Client-requested changes may require additional fees.`,
        },
        {
          number: "4.2",
          title: "Deposit Requirement",
          body: `Client shall pay a deposit equal to ${data.deposit}% of the project value before work begins. Freelancer is not required to begin work, reserve production time, deliver files, grant rights, schedule implementation, or continue performance until the deposit has been received. The deposit compensates Freelancer for reserved availability, onboarding, administrative time, project setup, planning, and opportunity cost.`,
        },
        {
          number: "4.3",
          title: "Invoicing",
          body:
            "Freelancer may issue invoices for deposits, milestones, completed work, approved expenses, recurring services, or final balances. Invoices may be delivered by email, payment platform, accounting system, or other reasonable method. Client is responsible for reviewing invoices promptly and notifying Freelancer of any good-faith dispute before the due date. Undisputed amounts remain payable even if another portion of an invoice is disputed.",
        },
        {
          number: "4.4",
          title: "Payment Terms",
          body:
            "Unless otherwise agreed in writing, invoices are due upon receipt. Remaining balances are due upon completion, delivery, approval, milestone completion, or invoice, depending on the project structure. Freelancer may withhold final deliverables, editable files, source files, credentials, publication rights, repository transfer, or intellectual property transfer until all amounts due are paid in full.",
        },
        {
          number: "4.5",
          title: "Late Payments",
          body:
            "Late payment may delay project work, delivery, launch, transfer of rights, or continued services. Freelancer may pause work if any undisputed amount is overdue. Pausing work does not waive Freelancer’s right to payment for completed work, reserved time, approved expenses, third-party costs, or non-cancellable commitments. If payment remains overdue, Freelancer may terminate the Agreement and pursue available remedies.",
        },
        {
          number: "4.6",
          title: "Chargebacks and Payment Disputes",
          body:
            "Client agrees not to initiate a chargeback, payment reversal, or payment dispute for amounts properly due without first contacting Freelancer in good faith. If Client initiates an improper chargeback, Client remains responsible for the underlying amount, platform fees, bank fees, administrative costs, and reasonable collection costs permitted by law. Freelancer may suspend access to deliverables or services while payment disputes are unresolved.",
        },
        {
          number: "4.7",
          title: "Taxes and Expenses",
          body:
            "Client is responsible for approved expenses, third-party costs, payment processing fees, platform fees, bank fees, currency conversion fees, licensing costs, hosting, software, stock assets, advertising spend, and external vendor fees unless otherwise agreed in writing. Freelancer is responsible for Freelancer’s own income taxes and business taxes. Sales tax, use tax, or similar taxes may be added where required by applicable law.",
        },
        ...getIndustryVariant(data.freelancerType).filter((s) =>
          s.number.startsWith("4.")
        ),
      ],
    },

    {
      number: "5",
  title: "Revisions",
  subsections: [
    {
      number: "5.1",
      title: "Included Revisions",
      body: "The Project fee includes the number of revision rounds expressly specified in this Agreement or selected during contract generation. A revision round consists of a consolidated set of reasonable modification requests submitted by Client after reviewing a deliverable. Revisions are intended to refine approved work and shall not be used to fundamentally redefine project objectives, deliverables, or requirements."
    },
    {
      number: "5.2",
      title: "Additional Revisions",
      body: "Any revision requests exceeding the included revision limit may be billed at Freelancer's then-current hourly rate or under a separate written agreement. Freelancer shall have no obligation to perform additional revisions until Client approves the applicable fees. Additional revision work may result in corresponding adjustments to project schedules, milestones, and delivery dates."
    },
    {
      number: "5.3",
      title: "Scope Changes",
      body: "Requests that materially alter previously approved deliverables, introduce new functionality, require substantial redesign, expand project objectives, or otherwise exceed the original scope shall constitute a scope change rather than a revision. Scope changes may require revised pricing, modified timelines, additional deposits, or execution of a separate statement of work."
    },
    {
      number: "5.4",
      title: "Written Approval",
      body: "Client acknowledges that approvals communicated by email, project management platform, messaging application, collaboration software, or other written communication channels shall be considered binding approvals for purposes of this Agreement. Once a deliverable has been approved, subsequent requests to revisit or substantially modify that deliverable may be treated as additional billable work."
    },
    {
      number: "5.5",
      title: "Change Order Process",
      body: "Where a requested modification exceeds the scope of the originally agreed services, Freelancer may issue a written change order describing the additional work, associated fees, revised timeline, and any other affected project terms. Work relating to the requested change shall not commence until the change order has been approved by Client in writing."
    },
    {
      number: "5.6",
      title: "Out-of-Scope Requests",
      body: "Examples of out-of-scope requests may include additional pages, features, integrations, deliverable formats, marketing campaigns, content creation, technical support, redesigns, strategic consulting, retraining, migration services, or any work not expressly included within the original project scope. Freelancer reserves the right to accept or decline such requests at its sole discretion."
        },
      ],
    },

    {
      number: "6",
      title: "Intellectual Property and Usage Rights",
      subsections: [
        {
          number: "6.1",
          title: "Ownership of Final Deliverables",
          body: getIPMainText(data.ipOwnership),
        },
        {
          number: "6.2",
          title: "Freelancer Materials",
          body:
            "Freelancer retains ownership of pre-existing materials, reusable components, templates, tools, processes, methods, code snippets, frameworks, strategy models, internal systems, drafts, rejected concepts, working files, and general know-how unless expressly agreed otherwise in writing. Client receives rights only to the final deliverables described in this Agreement and only to the extent specified by the selected ownership model.",
        },
        {
          number: "6.3",
          title: "Third-Party Assets",
          body:
            "Third-party assets remain subject to their own license terms. These may include fonts, stock images, plugins, open-source libraries, software platforms, APIs, templates, music, video, hosting tools, and other materials not created exclusively by Freelancer. Client is responsible for obtaining, maintaining, and complying with required third-party licenses unless Freelancer expressly agrees otherwise in writing.",
        },
        {
          number: "6.4",
          title: "License Grant",
          body:
            "If the selected ownership model grants Client a license rather than full ownership, Client may use the final deliverables only for the intended project purpose, business use, territory, duration, and media agreed by the Parties. Client may not resell, sublicense, redistribute, reverse engineer, modify, or reuse Freelancer’s underlying systems, methods, templates, or reusable components outside the project unless expressly permitted in writing.",
        },
        {
          number: "6.5",
          title: "Transfer Conditions",
          body:
            "Any transfer of ownership, license, source files, editable files, repository access, credentials, or final rights is conditioned on full payment of all amounts due. Freelancer may withhold final files, working files, editable assets, source code, publication rights, or transfer documentation until payment is complete. Rights do not transfer based merely on preview, draft delivery, review access, or partial payment.",
        },
     {
  number: "6.6",
  title: "License Scope",
  body: "Subject to full payment, Client receives a non-exclusive, exclusive, perpetual, revocable, or transferable license only to the extent expressly stated in this Agreement. Any rights not expressly granted remain reserved by Freelancer."
},
     {
  number: "6.7",
  title: "Moral Rights",
  body: "To the extent permitted by applicable law, Freelancer retains all moral rights not expressly transferred. Nothing in this Agreement obligates Freelancer to waive rights that cannot legally be waived."
},
{
  number: "6.8",
  title: "Derivative Works",
  body: "Client may create derivative works only to the extent permitted by the ownership and licensing structure selected by the Parties. Unauthorized modification beyond the granted rights is prohibited."
},
{
  number: "6.9",
  title: "Reservation of Rights",
  body: "All rights not expressly granted to Client remain the exclusive property of Freelancer or the applicable rights holder."
},

        ...getIndustryVariant(data.freelancerType).filter((s) =>
          s.number.startsWith("6.")
        ),
      ],
    },

    {
      number: "7",
  title: "Client Responsibilities",
  subsections: [
    {
      number: "7.1",
      title: "Client Materials",
      body: "Client shall provide all materials reasonably required for completion of the Project, including content, text, images, branding assets, technical specifications, business information, reference materials, legal disclosures, and other resources necessary for Freelancer to perform the Services. Client represents and warrants that it possesses all rights, licenses, permissions, and authorizations necessary to provide such materials and authorize their use within the Project."
    },
    {
      number: "7.2",
      title: "Access and Information",
      body: "Client shall provide timely access to accounts, software platforms, systems, websites, hosting environments, communication channels, analytics tools, project stakeholders, and other resources reasonably necessary for Freelancer to perform the Services. Freelancer shall not be responsible for delays, errors, or deficiencies resulting from incomplete, inaccurate, outdated, or unavailable information provided by Client."
    },
    {
      number: "7.3",
      title: "Timely Feedback",
      body: "Client agrees to review deliverables, respond to questions, provide approvals, and communicate requested revisions within the timeframes specified in this Agreement. Delayed responses may affect project schedules, milestone completion dates, and delivery timelines. Freelancer shall be entitled to adjust project deadlines as reasonably necessary to account for delayed Client feedback."
    },
    {
      number: "7.4",
      title: "Approvals and Decisions",
      body: "Client shall designate an authorized decision-maker with authority to approve deliverables, provide instructions, and make project-related decisions. Freelancer shall be entitled to rely upon instructions and approvals received from such representative. Conflicting instructions from multiple stakeholders may result in delays, additional revision requests, increased costs, or schedule adjustments."
    },
    {
      number: "7.5",
      title: "Cooperation Obligations",
      body: "Client agrees to cooperate in good faith throughout the Project and to take all actions reasonably necessary to facilitate completion of the Services. Such cooperation may include attending meetings, participating in review sessions, testing deliverables, providing required documentation, and communicating relevant information. Failure to cooperate may adversely affect Freelancer's ability to perform the Services and may require timeline or fee adjustments."
    },
    {
      number: "7.6",
      title: "Delays Caused by Client",
      body: "Any delay resulting from Client's failure to provide materials, information, access credentials, approvals, feedback, decisions, or cooperation shall automatically extend Freelancer's deadlines by a period reasonably necessary to accommodate the delay. Freelancer shall not be liable for missed deadlines, lost opportunities, additional expenses, or project impacts arising from Client-caused delays. Where substantial delays occur, Freelancer may suspend work until required information or approvals are received."
        },
        ...getIndustryVariant(data.freelancerType).filter((s) =>
          s.number.startsWith("7.")
        ),
      ],
    },

    {
      number: "8",
  title: "Acceptance Criteria",
  subsections: [
    {
      number: "8.1",
      title: "Review Period",
      body:
        "Client shall review each deliverable within five (5) business days following delivery unless a different review period is specified in writing. During the review period, Client may approve the deliverable, request revisions consistent with this Agreement, or provide written notice identifying any material deficiencies. Failure to provide a response within the applicable review period may constitute acceptance as provided herein.",
    },
    {
      number: "8.2",
      title: "Acceptance Procedure",
      body:
        "Acceptance may be communicated through email, project management software, collaboration platforms, electronic approval systems, written correspondence, or any other mutually agreed communication channel. A deliverable shall be considered accepted once Client confirms that it satisfies the agreed requirements or authorizes Freelancer to proceed to the next project phase.",
    },
    {
      number: "8.3",
      title: "Rejection Requirements",
      body:
        "If Client believes a deliverable does not materially conform to the agreed specifications, Client shall provide detailed written notice describing the specific deficiencies. General dissatisfaction, subjective preferences, or requests for additional features beyond the agreed scope shall not constitute valid grounds for rejection. Freelancer shall have a reasonable opportunity to address legitimate deficiencies identified by Client.",
    },
    {
      number: "8.4",
      title: "Partial Acceptance",
      body:
        "Where a deliverable contains multiple components, Client may accept portions that comply with the agreed requirements while identifying specific elements requiring correction. Accepted portions shall be deemed completed and shall remain subject to the payment obligations applicable to the corresponding project milestone.",
    },
    {
      number: "8.5",
      title: "Deemed Acceptance",
      body:
        "Any deliverable shall be deemed automatically accepted if Client fails to provide written rejection notice within the applicable review period, uses the deliverable in production, publishes, distributes, commercializes, or otherwise benefits from the deliverable, or requests work unrelated to correction of identified deficiencies. Deemed acceptance shall trigger any related payment obligations.",
    },
    {
      number: "8.6",
      title: "Post-Acceptance Changes",
      body:
        "Following acceptance, any request to alter, redesign, expand, modify, or replace an approved deliverable shall be treated as additional work subject to separate pricing, scheduling, and approval requirements. Freelancer shall have no obligation to perform post-acceptance modifications without a separate written agreement.",
        },
      ],
    },

    {
      number: "9",
      title: "Confidentiality",
      subsections: [
        {
          number: "9.1",
          title: "Definition",
          body:
            "Confidential information includes non-public business information, pricing information, client information, marketing plans, financial information, technical information, trade secrets, intellectual property, source files, credentials, strategy documents, private communications, customer lists, product roadmaps, internal processes, and proprietary materials disclosed by one Party to the other in connection with the project.",
        },
        {
          number: "9.2",
          title: "Protection Obligations",
          body:
            "Each Party agrees to protect confidential information using reasonable care and to use it only for purposes related to this Agreement. Neither Party may disclose confidential information to third parties except as necessary to perform the services, as approved in writing, or as required by law. Each Party should limit access to confidential information to people with a legitimate need to know.",
        },
        {
          number: "9.3",
          title: "Security Measures",
          body:
            "Each Party agrees to use reasonable security practices when handling confidential information, credentials, files, accounts, and project materials. Reasonable practices may include password protection, limited access, secure storage, careful sharing of credentials, and prompt notice if a Party becomes aware of unauthorized access. This clause does not create a guarantee against cyber incidents or third-party platform failures.",
        },
        {
          number: "9.4",
          title: "Permitted Disclosures",
          body:
            "A Party may disclose confidential information to employees, contractors, advisors, vendors, or service providers who need access to perform obligations under this Agreement, provided they are subject to confidentiality obligations or professional duties of confidentiality. A Party may also disclose confidential information if required by law, court order, subpoena, regulator, or similar legal process.",
        },
        {
          number: "9.5",
          title: "Exceptions",
          body:
            "Confidential information does not include information that is publicly available through no fault of the receiving Party, independently developed without use of confidential information, rightfully known before disclosure, lawfully received from a third party without confidentiality restrictions, or approved for release in writing by the disclosing Party.",
        },
        {
          number: "9.6",
          title: "Return or Destruction",
          body:
            "Upon reasonable written request, each Party will return or destroy confidential information that is no longer needed, except that a Party may retain archival copies required for legal, accounting, backup, compliance, or legitimate business purposes. Continued retention remains subject to the confidentiality obligations in this Agreement.",
        },
        {
          number: "9.7",
          title: "Survival",
          body:
            "Confidentiality obligations survive termination or completion of this Agreement. Trade secrets remain protected for as long as they qualify as trade secrets under applicable law. Other confidential information remains protected for a commercially reasonable period unless a longer period is required by law or agreed in writing.",
        },
      ],
    },

    {
      number: "10",
  title: "Independent Contractor",
  subsections: [
    {
      number: "10.1",
      title: "Independent Status",
      body:
        "The Parties acknowledge and agree that Freelancer is engaged as an independent contractor and not as an employee, partner, joint venturer, agent, or representative of Client. Nothing in this Agreement shall be construed as creating an employment relationship. Freelancer shall retain sole control over the manner, means, methods, scheduling, and performance of the Services, subject only to the deliverables and requirements expressly set forth in this Agreement.",
    },
    {
      number: "10.2",
      title: "Taxes and Withholdings",
      body:
        "Freelancer shall be solely responsible for reporting and paying all federal, state, local, and international taxes arising from compensation received under this Agreement, including income taxes, self-employment taxes, payroll taxes, social contributions, and any similar governmental assessments. Client shall not withhold taxes unless required by applicable law and shall have no responsibility for Freelancer's tax compliance obligations.",
    },
    {
      number: "10.3",
      title: "Benefits Disclaimer",
      body:
        "Freelancer acknowledges that, as an independent contractor, Freelancer is not entitled to participate in any employee benefit plans, pension programs, retirement plans, stock option programs, healthcare coverage, unemployment insurance, workers' compensation coverage, paid leave programs, or other benefits provided by Client to its employees. Freelancer expressly waives any claim to such benefits to the fullest extent permitted by law.",
    },
    {
      number: "10.4",
      title: "Equipment and Tools",
      body:
        "Unless otherwise expressly agreed in writing, Freelancer shall provide and maintain all equipment, software, hardware, internet access, office facilities, licenses, subscriptions, tools, and resources necessary to perform the Services. Client shall have no obligation to reimburse ordinary business expenses incurred by Freelancer except as specifically approved in advance and documented in writing.",
    },
    {
      number: "10.5",
      title: "Subcontractors and Assistants",
      body:
        "Freelancer may engage employees, assistants, consultants, subcontractors, or other service providers to support performance of the Services, provided Freelancer remains fully responsible for the quality, timeliness, confidentiality obligations, and contractual compliance of such persons. Freelancer shall ensure that any subcontractor is bound by confidentiality and intellectual property obligations no less protective than those contained in this Agreement.",
    },
    {
      number: "10.6",
      title: "No Authority to Bind Client",
      body:
        "Freelancer shall have no authority to enter into contracts, make representations, incur liabilities, accept obligations, provide warranties, negotiate commitments, or otherwise bind Client in any manner. Any statements made by Freelancer regarding Client shall be limited to information expressly authorized by Client. Freelancer shall not present itself as an employee, officer, partner, or authorized representative of Client.",
        },
      ],
    },

    {
      number: "11",
      title: "Warranties Disclaimer",
      subsections: [
        {
          number: "11.1",
          title: "Professional Services",
          body:
            "Freelancer warrants that services will be performed in a professional and workmanlike manner consistent with commercially reasonable freelance industry practices. This warranty does not guarantee a particular business outcome, subjective preference, third-party approval, platform performance, or result outside Freelancer’s reasonable control.",
        },
        {
          number: "11.2",
          title: "No Guaranteed Results",
          body:
            "Except as expressly stated in this Agreement, all services and deliverables are provided as is. Freelancer does not guarantee revenue increases, business results, search rankings, conversions, advertising performance, lead generation, profitability, audience growth, customer acquisition, fundraising, regulatory approval, or platform performance.",
        },
        {
          number: "11.3",
          title: "Third-Party Platforms",
          body:
            "Freelancer does not control third-party platforms, software providers, hosting providers, payment processors, social networks, search engines, ad networks, app stores, API providers, or marketplace rules. Freelancer is not responsible for outages, restrictions, policy changes, algorithm changes, account suspensions, disapprovals, data loss, or service interruptions caused by third parties.",
        },
        {
          number: "11.4",
          title: "External Factors",
          body:
            "Client understands that results may depend on Client’s offer, pricing, reputation, market conditions, product quality, customer demand, budget, operations, internal execution, sales process, legal compliance, industry competition, and third-party decisions. No oral or written statement outside this Agreement creates additional warranties unless included in a signed written amendment.",
        },
        ...getIndustryVariant(data.freelancerType).filter((s) =>
          s.number.startsWith("11.")
        ),
      ],
    },

    {
      number: "12",
      title: "Limitation of Liability",
      subsections: [
        {
          number: "12.1",
          title: "Liability Cap",
          body:
            "To the maximum extent permitted by law, Freelancer’s total liability under this Agreement shall not exceed the total fees paid by Client to Freelancer under this Agreement. This cap applies in the aggregate to all claims arising out of or related to the Agreement, whether based in contract, tort, negligence, strict liability, statute, or other legal theory.",
        },
        {
          number: "12.2",
          title: "Excluded Damages",
          body:
            "Neither Party shall be liable for indirect, incidental, consequential, special, punitive, exemplary, lost-profit, lost-revenue, lost-data, lost-opportunity, or business-interruption damages, even if the Party was advised that such damages were possible. This exclusion reflects the Parties’ agreement to allocate commercial risk in a reasonable and predictable manner.",
        },
        {
          number: "12.3",
          title: "Third-Party Services",
          body:
            "Freelancer is not liable for losses caused by third-party platforms, hosting providers, software providers, vendors, APIs, payment processors, social networks, search engines, ad networks, domain registrars, account restrictions, outages, security incidents, or Client’s unauthorized modifications. Client is responsible for backups, account ownership, credentials, and business continuity unless otherwise agreed in writing.",
        },
        {
          number: "12.4",
          title: "Legal Limits",
          body:
            "This limitation does not limit liability that cannot legally be limited under applicable law. Some jurisdictions may not allow exclusion or limitation of certain damages, so portions of this clause may apply only to the maximum extent permitted. If any limitation is found unenforceable, the remaining limitations should remain effective to the fullest extent permitted.",
        },
        {
          number: "12.5",
          title: "Risk Allocation",
          body:
            "The Parties agree that the fees charged under this Agreement reflect the risk allocation stated in this limitation of liability. Client may request higher liability limits, special insurance requirements, or additional protections before work begins, but such requests may require additional fees and must be agreed in writing.",
        },
        {
  number: "12.6",
  title: "Duty to Mitigate",
  body: "Each Party agrees to take commercially reasonable steps to mitigate any losses, damages, costs, or liabilities arising from a dispute or alleged breach of this Agreement."
},
{
  number: "12.7",
  title: "Aggregate Liability",
  body: "All claims arising from or relating to this Agreement shall be aggregated for purposes of calculating liability limitations."
},
{
  number: "12.8",
  title: "Claims Period",
  body: "No claim relating to this Agreement may be brought more than one year after the event giving rise to the claim, except where prohibited by law."
},

      ],
    },

    {
      number: "13",
  title: "Termination",
  subsections: [
    {
      number: "13.1",
      title: "Termination for Convenience",
      body:
        "Either Party may terminate this Agreement for any reason upon providing written notice to the other Party. Unless otherwise specified in this Agreement, termination shall become effective immediately upon receipt of such notice. Client acknowledges that termination does not relieve Client of payment obligations for Services performed, expenses incurred, or commitments made before the effective termination date.",
    },
    {
      number: "13.2",
      title: "Termination for Cause",
      body:
        "Either Party may terminate this Agreement if the other Party materially breaches any provision of this Agreement and fails to remedy such breach within the applicable cure period. Material breaches may include non-payment, repeated failure to cooperate, unauthorized use of intellectual property, violation of confidentiality obligations, fraud, unlawful conduct, or any conduct that substantially interferes with performance of the Services.",
    },
    {
      number: "13.3",
      title: "Cure Period",
      body:
        "Before exercising termination rights for a material breach, the non-breaching Party shall provide written notice describing the nature of the breach and allow a period of ten (10) business days for correction, unless immediate termination is justified by unlawful conduct, fraud, security concerns, or irreparable harm. If the breach is cured within the applicable period, the Agreement shall remain in effect.",
    },
    {
      number: "13.4",
      title: "Payment Upon Termination",
      body:
        "Upon termination, Client shall promptly pay Freelancer for all Services performed, milestones completed, approved expenses incurred, and authorized work completed through the effective date of termination. Any non-refundable deposits previously paid shall remain non-refundable unless otherwise required by applicable law. Freelancer may withhold delivery of unfinished work until outstanding amounts have been paid in full.",
    },
    {
      number: "13.5",
      title: "Return and Protection of Materials",
      body:
        "Upon termination, each Party shall return or destroy confidential information belonging to the other Party upon written request, except where retention is required by law, professional recordkeeping obligations, insurance requirements, dispute resolution needs, or legitimate business purposes. Confidentiality obligations shall continue notwithstanding termination.",
    },
    {
      number: "13.6",
      title: "Survival of Obligations",
      body:
        "Any provisions which by their nature should survive termination shall remain in full force and effect following termination of this Agreement, including payment obligations, confidentiality provisions, intellectual property rights, limitation of liability, indemnification obligations, dispute resolution procedures, and any other provisions intended to survive expiration or termination.",
},

      ],
    },

    {
      number: "14",
      title: "Governing Law",
      subsections: [
        {
          number: "14.1",
          title: "Governing State",
          body: `This Agreement shall be governed by the laws of ${stateName(
            data.clientState
          )}, without regard to conflict of law principles. The Parties understand that state law may affect enforceability of certain provisions, including independent contractor classification, late fees, limitation of liability, arbitration, non-competes, non-solicitation, and intellectual property terms.`,
        },
        {
          number: "14.2",
          title: "Venue",
          body:
            "Unless otherwise agreed in writing, disputes may be brought in a court or forum with proper jurisdiction under applicable law. The Parties should consider whether venue, arbitration, mediation, or small-claims procedures are appropriate for their circumstances. If a more specific dispute resolution process is required, it should be added in writing before signing.",
        },
        {
          number: "14.3",
          title: "Good Faith Resolution",
          body:
            "Before pursuing formal legal remedies, the Parties agree to attempt in good faith to resolve disputes through written communication. Good faith resolution may include identifying the issue, exchanging relevant information, discussing practical solutions, and allowing a reasonable opportunity to cure. This does not prevent either Party from seeking urgent or equitable relief when appropriate.",
        },
        {
          number: "14.4",
          title: "State-Specific Issues",
          body:
            "State-specific rules may affect contractor classification, wage laws, tax treatment, consumer protection, late fees, IP assignment, confidentiality, non-competes, limitation of liability, and dispute resolution. Attorney review is recommended where state-specific enforceability is important, especially for California clients, high-value projects, regulated industries, or complex intellectual property transfers.",
        },
      ],
    },

    {
      number: "15",
      title: "Legal Disclaimer",
      subsections: [
        {
          number: "15.1",
          title: "No Legal Advice",
          body:
            "This document was generated automatically by ContractPilot for informational and document automation purposes only. ContractPilot is not a law firm, does not provide legal advice, and does not create an attorney-client relationship. The generated contract is based on user-selected inputs and standardized clause logic, not individualized legal analysis by a licensed attorney.",
        },
        {
          number: "15.2",
          title: "No Attorney-Client Relationship",
          body:
            "Use of this document, the ContractPilot platform, automated clause generation, risk scoring, or document export does not create an attorney-client relationship with ContractPilot, its operators, contributors, reviewers, or affiliates. Communications with the platform should not be treated as privileged legal communications. Users remain responsible for deciding whether the document is appropriate for their circumstances.",
        },
        {
          number: "15.3",
          title: "User Responsibility",
          body:
            "This generated document may not account for all facts, state laws, industry-specific requirements, tax implications, employment classification rules, consumer protection issues, intellectual property issues, privacy obligations, data security requirements, or regulatory obligations. Users should carefully review the document, confirm the accuracy of all inputs, and modify or obtain review where necessary before signing.",
        },
        {
          number: "15.4",
          title: "Attorney Review Recommendation",
          body:
            "Parties should consult a licensed attorney for advice specific to their situation, especially for high-value projects, international clients, equity compensation, regulated industries, healthcare, legal, finance, sensitive intellectual property, employment classification concerns, complex licensing, unusual payment terms, or state-specific legal requirements. Attorney review is strongly recommended where enforceability risk is material.",
        },
      ],
    },
    {
  number: "16",
  title: "Risk Review Notice",
  subsections: [
    {
  number: "16.1",
  title: "Attorney Review Recommendation",
  body:
    "The Parties acknowledge that automated contract generation tools are designed to streamline document preparation but cannot account for every factual, legal, tax, regulatory, employment, intellectual property, privacy, or jurisdiction-specific issue that may arise in a particular engagement. The Parties understand that laws vary between states and may change over time. For projects involving substantial financial commitments, complex intellectual property arrangements, regulated industries, employment-related concerns, or unusual commercial terms, the Parties are strongly encouraged to seek advice from a qualified attorney licensed in the relevant jurisdiction before relying on this Agreement.",
},
{
  number: "16.2",
  title: "High-Risk Projects",
  body:
    "Certain engagements may present elevated legal or commercial risks that extend beyond the scope of a standard freelance services agreement. These may include projects involving healthcare, financial services, legal services, government contracting, international transactions, equity compensation, cryptocurrency, artificial intelligence systems, sensitive personal information, large-scale software deployments, or the transfer of valuable intellectual property rights. In such circumstances, the Parties acknowledge that additional contractual protections, compliance reviews, insurance requirements, or legal consultation may be appropriate before work begins.",
},
{
  number: "16.3",
  title: "State-Specific Rules",
  body:
    "The Parties further acknowledge that certain jurisdictions, including California and other states, may impose specific statutory requirements relating to independent contractor classification, payment obligations, confidentiality restrictions, intellectual property ownership, consumer protection laws, privacy regulations, or dispute resolution procedures. Nothing in this Agreement is intended to waive rights that cannot legally be waived under applicable law. Where local law imposes requirements that differ from the provisions of this Agreement, the applicable law shall govern to the extent required, and the remaining provisions shall continue in full force and effect.",
},
  ]
}
  ];
}
function getScopeByType(type: FreelancerType, projectName: string) {
  const project = value(projectName, "the project");

  const scopes: Record<string, string> = {
    designer: `Freelancer shall provide professional design services for ${project}. Services may include branding, visual identity, layout design, user interface design, graphic assets, design systems, creative direction, and related design deliverables. The exact deliverables are limited to those described in the project description or approved proposal. Design services do not include printing, manufacturing, trademark clearance, stock asset licensing, copywriting, development, or source file transfer unless expressly included in writing.`,
    developer: `Freelancer shall provide software or web development services for ${project}. Services may include planning, coding, implementation, testing, deployment support, bug fixes within the agreed scope, and related technical deliverables. Development services do not include long-term maintenance, hosting, monitoring, cybersecurity audits, database administration, third-party platform support, or post-launch support unless expressly included in writing.`,
    copywriter: `Freelancer shall provide copywriting services for ${project}. Services may include website copy, sales pages, email copy, advertising copy, SEO content, content strategy, scripts, messaging, and related written deliverables. Copywriting services do not include legal review, regulatory review, fact verification, medical review, financial compliance review, or substantiation of claims unless expressly agreed in writing.`,
    consultant: `Freelancer shall provide consulting services for ${project}. Services may include strategic advice, analysis, recommendations, planning sessions, audits, workshops, reports, frameworks, and related advisory deliverables. Consulting services are advisory in nature and do not include implementation, management authority, legal advice, financial advice, tax advice, or guaranteed business results unless expressly agreed in writing.`,
    "social-media": `Freelancer shall provide social media management services for ${project}. Services may include content planning, caption writing, scheduling, reporting, creative coordination, and platform support. Social media services do not include advertising spend, influencer payments, platform fees, community management, crisis communications, account recovery, or guaranteed follower growth unless expressly included in writing.`,
  };

  return scopes[type] || `Freelancer shall provide professional services for ${project}. Services are limited to the project description, agreed deliverables, and written approvals between the Parties.`;
}

function getIPMainText(ip: string) {
  if (ip === "client") {
    return "Upon receipt of full payment, Freelancer assigns to Client the agreed final deliverables specifically created for the project, excluding Freelancer’s pre-existing materials, reusable tools, templates, internal systems, methods, drafts, rejected concepts, third-party materials, and general know-how. Client receives ownership only in the final approved deliverables identified in the scope. Any broader transfer, including source files, editable files, resale rights, or exclusive ownership of underlying systems, must be expressly agreed in writing.";
  }

  if (ip === "reuse") {
    return "Freelancer retains ownership of pre-existing materials, reusable components, tools, templates, code snippets, frameworks, processes, strategy models, internal systems, and general know-how. After full payment, Client receives a limited license to use the final deliverables for the intended project purpose. Client may not resell, sublicense, redistribute, reverse engineer, or reuse Freelancer’s underlying systems outside the project unless expressly agreed in writing.";
  }

  if (ip === "mixed") {
    return "Client receives rights to use the final deliverables for the intended project purpose after full payment has been received. Freelancer retains ownership of pre-existing materials, reusable systems, internal methods, templates, drafts, rejected concepts, and general know-how. Freelancer may display non-confidential final work in a portfolio unless Client requests confidentiality in writing. Any exclusive ownership, resale rights, or source file transfer must be separately agreed.";
  }

  return "Ownership and usage rights transfer according to the selected project terms and only after full payment has been received. Unless expressly agreed otherwise, Freelancer retains pre-existing materials, reusable methods, templates, tools, drafts, rejected concepts, internal processes, and general know-how.";
}

export function getRiskWarnings(data: ContractData): RiskWarning[] {
  return getRiskAssessment(data).warnings;
}

export function getRiskAssessment(data: ContractData): RiskAssessment {
  const warnings: RiskWarning[] = [];
  let score = 10;

  const projectValue = Number(data.projectValue || 0);

  if (projectValue > 10000) {
    score += 20;
    warnings.push({
      level: "YELLOW",
      title: "High project value",
      message:
        "Attorney review is recommended for projects over $10,000 because payment, liability, IP, and dispute risks are higher.",
    });
  }

  if (data.deposit === 0) {
    score += 30;
    warnings.push({
      level: "RED",
      title: "No deposit",
      message:
        "No deposit increases payment risk. Consider requiring an upfront payment before work begins.",
    });
  } else if (data.deposit < 20) {
    score += 15;
    warnings.push({
      level: "YELLOW",
      title: "Low deposit",
      message:
        "A low deposit may not adequately protect reserved time, onboarding, and upfront project work.",
    });
  }

  if (data.revisions === "unlimited") {
    score += 25;
    warnings.push({
      level: "RED",
      title: "Unlimited revisions",
      message:
        "Unlimited revisions can create scope creep. Consider limiting revisions and defining what counts as a revision.",
    });
  }

  if (data.clientState === "CA") {
    score += 15;
    warnings.push({
      level: "YELLOW",
      title: "California client",
      message:
        "California may involve sensitive contractor classification and enforceability considerations. Attorney review is recommended.",
    });
  }

  if (data.ipOwnership === "client") {
    score += 15;
    warnings.push({
      level: "YELLOW",
      title: "Client IP ownership",
      message:
        "Full client ownership should clearly exclude freelancer pre-existing materials, reusable systems, tools, templates, and third-party materials.",
    });
  }

  if (!data.projectDescription || data.projectDescription.length < 20) {
    score += 10;
    warnings.push({
      level: "YELLOW",
      title: "Short project description",
      message:
        "A short or vague project description increases the risk of scope disputes and revision conflicts.",
    });
  }

  const finalScore = Math.min(score, 100);

  const level: "GREEN" | "YELLOW" | "RED" =
    finalScore >= 70 ? "RED" : finalScore >= 35 ? "YELLOW" : "GREEN";

  return {
    score: finalScore,
    level,
    warnings,
  };
}
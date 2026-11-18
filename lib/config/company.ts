/**
 * Single source of truth for company facts shown anywhere on the site.
 *
 * Facts below marked PLACEHOLDER (registered address) are pending delivery from the client
 * (Rajiv Pal / Manish) and must be replaced before production launch.
 * Everything else is verifiable from docs/project_details/.
 */
export const company = {
  legalName: "VAYITAGROW BIOORGANICS PRIVATE LIMITED",
  displayName: "VayitaGrow Bioorganics",
  shortName: "VayitaGrow",
  tagline: "Sustainable Agricultural Solutions for Modern Farming",
  supportingMessage:
    "Delivering quality agricultural inputs through innovation, reliability, and strong field support.",
  industry: "Agricultural Inputs Manufacturing and Marketing",
  businessModel: "B2B",
  operatingStates: ["West Bengal", "Jharkhand"] as const,
  registeredState: "Jharkhand",
  contact: {
    // PLACEHOLDER - full registered address (Jharkhand) pending from client.
    addressLines: ["Registered Office", "Jharkhand, India"],
    mobiles: ["+91 96096 02539", "+91 74318 17917"],
    email: "vayitagrowbio.organics@gmail.com",
    hours: "Monday to Saturday, 9:00 AM to 6:00 PM IST",
  },
} as const;

export type OperatingState = (typeof company.operatingStates)[number];

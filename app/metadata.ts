import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Devesh Mandhata | Law & Policy",
    template: "%s | Devesh Mandhata",
  },
  description:
    "A platform for in-depth legal, policy, and jurisprudential analysis across diverse areas.",
  keywords: [
    "law",
    "policy",
    "legal research",
    "public policy",
    "jurisprudence",
    "technology law",
    "M&A",
    "constitutional law",
    "legal reforms",
  ],
  openGraph: {
    title: "Devesh Mandhata | Law & Policy",
    description:
      "Expert legal and policy analysis across diverse domains and jurisdictions.",
    url: "https://yourdomain.com",
    siteName: "Law & Policy – Devesh Mandhata",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://yourdomain.com"),
};

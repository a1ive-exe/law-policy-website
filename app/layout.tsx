import { Inter, Crimson_Text, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const crimsonText = Crimson_Text({ weight: ["400","600","700"], subsets: ["latin"], variable: "--font-crimson" });
const sourceSerif = Source_Serif_4({ weight: ["400","600","700"], subsets: ["latin"], variable: "--font-serif" });

export * from "./metadata";

const SITE_URL = "https://deveshmandhata.in";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // ✅ Next 16: cookies() is async
  const cookieStore = await cookies();
  const isAdmin = Boolean(cookieStore.get?.("admin_token")?.value);

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Law & Policy Insights",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${crimsonText.variable} ${sourceSerif.variable} font-sans antialiased bg-slate-50`}
        suppressHydrationWarning
      >
        <div className="flex min-h-screen flex-col" suppressHydrationWarning>
          <Header isAdmin={isAdmin} />
          <main className="flex-1" suppressHydrationWarning>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

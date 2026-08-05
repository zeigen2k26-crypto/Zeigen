import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import { SYMPOSIUM_CONFIG } from "@/constants/config";
import CustomCursor    from "@/components/CustomCursor";
import SakuraBackground from "@/components/SakuraBackground";
import ScrollProgress  from "@/components/ScrollProgress";
import SmoothScroll    from "@/components/SmoothScroll";
import Navbar          from "@/components/Navbar";
import Footer          from "@/components/Footer";

/* ── Fonts ── */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  display: "swap",
  weight: ["400", "500", "700"],
});

/* ── Metadata ── */
export const metadata: Metadata = {
  title: `${SYMPOSIUM_CONFIG.name} | ${SYMPOSIUM_CONFIG.subTagline} | ${SYMPOSIUM_CONFIG.association}`,
  description: `Official website for ZEIGEN '26 — National Level Technical Symposium organized by the Association of Computer Engineers (ACE), Department of Computer Science & Engineering, K.L.N. College of Engineering.`,
  keywords: [
    "ZEIGEN '26",
    "KLNCE Symposium",
    "Computer Science Symposium",
    "ACE KLNCE",
    "Technical Symposium Madurai",
    "National Symposium",
    "Paperwands",
    "Breaking Bid",
  ],
  authors: [{ name: "ACE Web Team - KLNCE" }],
  openGraph: {
    title: `${SYMPOSIUM_CONFIG.name} — ${SYMPOSIUM_CONFIG.subTagline}`,
    description: SYMPOSIUM_CONFIG.subTagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${notoSerifJP.variable} scroll-smooth`}
    >
      <body
        className="antialiased min-h-screen flex flex-col"
        style={{ background: "var(--parchment)", color: "var(--ink)" }}
      >
        <SmoothScroll>
          <ScrollProgress />
          <CustomCursor />
          <SakuraBackground />
          <Navbar />
          <main className="flex-1 relative z-20">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

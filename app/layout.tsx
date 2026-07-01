import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Bricolage_Grotesque, DM_Sans, Cascadia_Code } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import AppOverlays from "@/components/shared/AppOverlays";
import {
  getCopy,
  LOCALE_COOKIE_NAME,
  resolveLocale,
} from "@/lib/i18n/translations";
import "./globals.css";

// Display Font - Bricolage Grotesque for headings
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// Body Font - DM Sans for body text
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Monospace Font - Cascadia Code for code snippets
const cascadiaCode = Cascadia_Code({
  subsets: ["latin"],
  variable: "--font-cascadia",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = resolveLocale(cookieStore.get(LOCALE_COOKIE_NAME)?.value);
  const copy = getCopy(locale);

  return {
    metadataBase: new URL("https://www.afrinsultanaakhi.me"),
    title: copy.metadata.title,
    description: copy.metadata.description,
    keywords: [
      "Afrin Sultana Akhi",
      "SnoOpWo0t",
      "competitive programming",
      "ICPC",
      "Codeforces",
      "web development",
      "Next.js",
      "React",
      "TypeScript",
      "University of Asia Pacific",
      "Bangladesh",
    ],
    authors: [
      { name: "Afrin Sultana Akhi", url: "https://github.com/afrinsultanaakhi" },
    ],
    creator: "Afrin Sultana Akhi",
    openGraph: {
      type: "website",
      locale: locale === "bn" ? "bn_BD" : "en_US",
      url: "https://www.afrinsultanaakhi.me",
      title: copy.metadata.title,
      description: copy.metadata.ogDescription,
      siteName: "Afrin Sultana Akhi's Portfolio",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Afrin Sultana Akhi Portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.metadata.title,
      description: copy.metadata.ogDescription,
      images: ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const initialLocale = resolveLocale(
    cookieStore.get(LOCALE_COOKIE_NAME)?.value,
  );

  return (
    <html
      lang={initialLocale}
      suppressHydrationWarning
      className={`${bricolage.variable} ${dmSans.variable} ${cascadiaCode.variable} ${initialLocale === "bn" ? "locale-bn" : ""}`}
    >
      <body className={`${dmSans.className} antialiased`}>
        <ThemeProvider>
          <LanguageProvider initialLocale={initialLocale}>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <AppOverlays />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono, Shantell_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const shantellSans = Shantell_Sans({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-shantell",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.zerotoainative.xyz"),
  title: {
    default: "Zero to AI-Native",
    template: "%s | Zero to AI-Native",
  },
  description:
    "An open-source curriculum of primary-source AI material, from fundamentals to production systems.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Zero to AI-Native",
    description:
      "An open-source curriculum of primary-source AI material, from fundamentals to production systems.",
    url: "https://www.zerotoainative.xyz",
    siteName: "Zero to AI-Native",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zero to AI-Native",
    description:
      "An open-source curriculum of primary-source AI material, from fundamentals to production systems.",
    creator: "@tushaarmehtaa",
    site: "@tushaarmehtaa",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${shantellSans.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}

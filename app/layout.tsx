import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zero-to-ai-native.vercel.app"),
  title: "zero to ai-native",
  description:
    "the best papers, guides, blogs and lectures on ai. straight from the people building it, grouped by level so you always know what to read next.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "zero to ai-native",
    description:
      "the best papers, guides, blogs and lectures on ai. straight from the people building it.",
    url: "https://zero-to-ai-native.vercel.app",
    siteName: "zero to ai-native",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "zero to ai-native",
    description:
      "the best papers, guides, blogs and lectures on ai. straight from the people building it.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}

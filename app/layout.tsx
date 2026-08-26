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
  metadataBase: new URL("https://www.zerotoainative.xyz"),
  title: {
    default: "zero to ai-native",
    template: "%s | zero to ai-native",
  },
  description:
    "an open-source curriculum of primary-source AI material, from fundamentals to production systems.",
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
      "an open-source curriculum of primary-source AI material, from fundamentals to production systems.",
    url: "https://www.zerotoainative.xyz",
    siteName: "zero to ai-native",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "zero to ai-native",
    description:
      "an open-source curriculum of primary-source AI material, from fundamentals to production systems.",
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

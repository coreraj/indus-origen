import type { Metadata } from "next";
import { Baloo_2, Geist, Geist_Mono, Quicksand } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "Indus Origen | Spice Route Snacks",
  description:
    "A high-energy ecommerce concept for Indus Origen snacks, combos, and flavor-forward drops.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${baloo.variable} ${quicksand.variable}`}>
      <body>{children}</body>
    </html>
  );
}

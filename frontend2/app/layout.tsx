import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppBanner from "./AppBanner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Frontend",
  description: "My Frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppBanner></AppBanner>
        {children}
      </body>
    </html>
  );
}

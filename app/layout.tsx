import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LastUpdated } from "@/components/LastUpdated";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { Sidebar } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "VLSI LAB Academy - Verilog, SV & UVM",
  description: "A professional, full-featured web application for mastering Verilog, SystemVerilog, and UVM.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full bg-black">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 ml-64 min-h-screen bg-black">
            {children}
          </main>
          <LastUpdated />
        </div>
      </body>
    </html>
  );
}

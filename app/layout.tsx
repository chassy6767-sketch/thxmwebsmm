import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/components/providers/supabase-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "THXM - The Most Trusted Middleman",
  description:
    "Secure your deal with THXM. Fast, trusted, and backed by real customer reviews.",
  openGraph: {
    title: "THXM - The Most Trusted Middleman",
    description:
      "Secure your deal with THXM. Fast, trusted, and backed by real customer reviews.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} text-white`}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

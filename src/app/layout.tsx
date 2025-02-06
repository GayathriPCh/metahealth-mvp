import WalletContextProvider from "@/context/WalletContextProvider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Solana DApp",
  description: "A Next.js DApp using Solana wallet adapter",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WalletContextProvider>
          {children}
        </WalletContextProvider>
      </body>
    </html>
  );
}

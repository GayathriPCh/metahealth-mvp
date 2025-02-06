"use client";

import React, { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/navigation";

const Landing: React.FC = () => {
  const { connected } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (connected) {
      router.push("/home"); // Redirect to home.tsx when wallet is connected
    }
  }, [connected, router]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>MetaHealth</h1>

      <WalletMultiButton />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    textAlign: "center" as "center",
    backgroundColor: "#f4f4f4",
    fontFamily: "Muli, sans-serif",
  },
  title: {
    fontSize: "6rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    fontFamily: "Muli, sans-serif",
  },
};

export default Landing;

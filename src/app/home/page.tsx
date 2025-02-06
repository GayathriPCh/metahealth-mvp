"use client";

import React, { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar"; // Import Navbar

const Home: React.FC = () => {
  const { connected } = useWallet();
  const router = useRouter();

  // If wallet is not connected, redirect to landing page
  useEffect(() => {
    if (!connected) {
      router.push("/");
    }
  }, [connected, router]);

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.welcome}>Welcome to MetaHealth 🏥</h1>
        <p>Your decentralized healthcare platform.</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    height: "90vh",
    textAlign: "center" as "center",
  },
  welcome: {
    fontSize: "2rem",
    fontWeight: "bold",
  },
};

export default Home;

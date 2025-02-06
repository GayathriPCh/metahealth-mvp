"use client";

import React from "react";
import Navbar from "@/components/Navbar"; // Import Navbar

const Resources: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.heading}>Resources</h2>
        <p style={styles.description}>
          Explore essential guides, tutorials, and best practices for using MetaHealth.
        </p>

        <div style={styles.resourceSection}>
          <h3 style={styles.subheading}>📖 MetaHealth Guide</h3>
          <p>Learn how to get started with MetaHealth and its features.</p>
        </div>

        <div style={styles.resourceSection}>
          <h3 style={styles.subheading}>🔗 Solana & Phantom Wallet</h3>
          <p>Step-by-step instructions on setting up and securing your Solana wallet.</p>
        </div>

        <div style={styles.resourceSection}>
          <h3 style={styles.subheading}>🛡️ Web3 Security & Aadhaar Verification</h3>
          <p>Best practices for protecting your wallet and verifying your identity.</p>
        </div>
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
    padding: "2rem",
    textAlign: "center" as const,
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  description: {
    fontSize: "1.2rem",
    maxWidth: "600px",
    marginBottom: "2rem",
    color: "#555",
  },
  resourceSection: {
    background: "#f4f4f4",
    padding: "1.5rem",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "600px",
    textAlign: "center" as const,
    marginBottom: "1rem",
  },
  subheading: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  },
};

export default Resources;

"use client";

import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";

const Profile: React.FC = () => {
  const { connected, publicKey } = useWallet();

  return (
    <div>
    <div style={styles.container}>
      <div style={styles.profileBox}>
        <h2 style={styles.heading}>Profile</h2>
        {connected ? (
          <p style={styles.info}>
            <strong>Wallet Address:</strong> {publicKey?.toBase58()}
          </p>
        ) : (
          <p style={styles.info}>🔴 Wallet not connected</p>
        )}
      </div>
    </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",  // ✅ Keeps profile content centered, but doesn't affect navbar
    minHeight: "100vh",     // ✅ Ensures full-page height
    width: "100%",          // ✅ Makes sure the navbar stretches full width
  },
  profileBox: {
    background: "#f4f4f4",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "600px",
    textAlign: "center" as const,
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  info: {
    fontSize: "1.2rem",
    color: "#333",
  },
};

export default Profile;
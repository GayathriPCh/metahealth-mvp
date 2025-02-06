"use client";

import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav style={styles.navbar}>
      <h1 style={styles.logo}>MetaHealth</h1>
      <div style={styles.links}>
        <Link href="/home" style={styles.link}>Home</Link>
        <Link href="/profile" style={styles.link}>Profile</Link>
        <Link href="/resources" style={styles.link}>Resources</Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#0070f3",
    color: "white",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  links: {
    display: "flex",
    gap: "1rem",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "1rem",
  },
};

export default Navbar;

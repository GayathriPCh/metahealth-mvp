"use client";

import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { Connection } from "@solana/web3.js";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import RegisterPatient from "@/components/RegisterPatient";
import MedicalRecords from "@/components/MedicalRecords";
import DoctorAccess from "@/components/DoctorAccess";
import Profile from "@/components/Profile";
import About from "@/components/About";

// SOLANA CONNECTION CONFIG
const SOLANA_RPC = "https://api.devnet.solana.com";
const connection = new Connection(SOLANA_RPC);

const Home: React.FC = () => {
  const { connected } = useWallet();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard"); // Default tab

  // Redirect to landing if wallet is not connected
  useEffect(() => {
    if (!connected) {
      router.push("/");
    }
  }, [connected, router]);

  // Function to render content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "register":
        return <RegisterPatient />;
      case "records":
        return <MedicalRecords />;
      case "doctor-access":
        return <DoctorAccess />;
      case "profile":
        return <Profile />;
      case "about":
        return <About />;
      default:
        return <h2>Select an option from the sidebar.</h2>;
    }
  };

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="content">{renderContent()}</main>
      </div>
    </div>
  );
};

export default Home;

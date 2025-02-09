"use client";

import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

const Home: React.FC = () => {
  const { connected } = useWallet();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard"); // Default tab: My Dashboard

  // Redirect to landing if wallet is not connected
  useEffect(() => {
    if (!connected) {
      router.push("/");
    }
  }, [connected, router]);

  // Component to render based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div>
            <h2>👋 Welcome to MetaHealth!</h2>
            <p>Explore your dashboard:</p>
            <ul>
              <li>📖 Learn how to book an appointment</li>
              <li>🧑‍⚕️ Try our telemedicine service</li>
              <li>🔒 Understand how decentralized prescriptions work</li>
            </ul>
          </div>
        );
      case "appointments":
        return <h2>📅 Book an Appointment - Coming Soon!</h2>;
      case "prescriptions":
        return <h2>💊 Your Prescriptions - Coming Soon!</h2>;
      case "emergency":
        return <h2>🚑 Emergency Access - Coming Soon!</h2>;
      case "resources":
        return (
          <div>
            <h2>📂 Saved Resources</h2>
            <p>Your bookmarked guides, articles, and links will appear here.</p>
          </div>
        );
      default:
        return <h2>Select an option from the sidebar.</h2>;
    }
  };

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <button className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>
            🏠 My Dashboard
          </button>
          <button className={activeTab === "appointments" ? "active" : ""} onClick={() => setActiveTab("appointments")}>
            📅 Book Appointment
          </button>
          <button className={activeTab === "prescriptions" ? "active" : ""} onClick={() => setActiveTab("prescriptions")}>
            💊 Your Prescriptions
          </button>
          <button className={activeTab === "emergency" ? "active" : ""} onClick={() => setActiveTab("emergency")}>
            🚑 Emergency Access
          </button>
          <button className={activeTab === "resources" ? "active" : ""} onClick={() => setActiveTab("resources")}>
            📂 Saved Resources
          </button>
        </aside>

        {/* Main Content */}
        <main className="content">{renderContent()}</main>
      </div>

      {/* Styles */}
      <style jsx>{`
        .dashboard {
          display: flex;
          flex-direction: column;
          height: 100vh;
        }
        .dashboard-container {
          display: flex;
          flex: 1;
        }
        .sidebar {
          width: 250px;
          background: #f4f4f4;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .sidebar button {
          width: 100%;
          padding: 12px;
          background: white;
          border: 1px solid #ccc;
          cursor: pointer;
          text-align: left;
          font-weight: bold;
          transition: 0.2s;
        }
        .sidebar button:hover {
          background: #ddd;
        }
        .sidebar .active {
          background: #007bff;
          color: white;
          border: none;
        }
        .content {
          flex: 1;
          padding: 20px;
        }
      `}</style>
    </div>
  );
};

export default Home;

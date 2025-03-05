"use client";

import React from "react";
import './Sidebar.css';
interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="sidebar">
      <button className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>
        🏠 Dashboard
      </button>
      <button className={activeTab === "register" ? "active" : ""} onClick={() => setActiveTab("register")}>
        ✍️ Register as Patient
      </button>
      <button className={activeTab === "records" ? "active" : ""} onClick={() => setActiveTab("records")}>
        📂 Medical Records
      </button>
      <button className={activeTab === "doctor-access" ? "active" : ""} onClick={() => setActiveTab("doctor-access")}>
        👨‍⚕️ Manage Doctor Access
      </button>
      <button className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>
        🔐 My Profile
      </button>
      <button className={activeTab === "about" ? "active" : ""} onClick={() => setActiveTab("about")}>
        ℹ️ About
      </button>
    </aside>
  );
};

export default Sidebar;


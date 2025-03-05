"use client";

import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div>
      <h2>👋 Welcome to MetaHealth!</h2>
      <p>Explore your dashboard:</p>
      <ul>
        <li>✍️ Register as a patient to store medical data securely.</li>
        <li>📂 Upload and manage your medical records.</li>
        <li>👨‍⚕️ Grant or revoke doctor access to your records.</li>
        <li>🔐 View and update your profile.</li>
        <li>ℹ️ Learn more about MetaHealth’s decentralized security.</li>
      </ul>
    </div>
  );
};

export default Dashboard;

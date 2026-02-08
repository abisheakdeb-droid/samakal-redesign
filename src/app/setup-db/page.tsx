"use client";

import { createCommentsTable, createReadingHistoryTable, createPushSubscriptionsTable } from "@/lib/setup-db";
import { useState } from "react";

export default function SetupPage() {
  const [status, setStatus] = useState("Idle");

  const handleSetup = async () => {
    setStatus("Creating tables...");
    const cResult = await createCommentsTable();
    const hResult = await createReadingHistoryTable();
    const pResult = await createPushSubscriptionsTable();
    setStatus(`${cResult.message} | ${hResult.message} | ${pResult.message}`);
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Database Setup</h1>
      <button 
        onClick={handleSetup}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Create All Tables
      </button>
      <p className="mt-4 font-mono">{status}</p>
    </div>
  );
}

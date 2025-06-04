"use client";

import { useState } from "react";
import "../styling/advisor.css";
import Sidebar from "../tools/sidebar";

export default function Advisor() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      // Safely handle failed fetch
      if (!res.ok) {
        const err = await res.json();
        setResponse("Error: " + err.error);
        setLoading(false);
        return;
      }

      const data = await res.json();

      if (data.reply) {
        setResponse(data.reply);
      } else {
        setResponse("No valid response received.");
      }
    } catch (error) {
      console.error("Client Error:", error);
      setResponse("An unexpected error occurred.");
    }

    setLoading(false);
  };

  return (
    <div className="page-container">
      <Sidebar />
      <div className="main-content">
        <h1>AI Financial Advisor</h1>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask me how to save money..."
          rows={4}
        />
        <button onClick={handleAsk} disabled={loading}>
          {loading ? "Thinking..." : "Ask AI"}
        </button>
        <div className="response-box">
          <strong>Response:</strong> {response}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";

function AIRecommendations() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");

  const getRecommendations = async () => {
    const res = await fetch("http://localhost:7000/ai/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    setResult(data.recommendations);
  };

  return (
    <div className="container mt-4">
      <h3>🔍 AI Hotel Recommendation</h3>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="e.g., luxury hotel near Islamabad"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="btn btn-primary" onClick={getRecommendations}>
        Get Recommendations
      </button>

      {result && (
        <div className="mt-3 card p-3">
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}

export default AIRecommendations;

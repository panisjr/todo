import React, { useState } from "react";

const GenerateText = () => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/generateText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.error}`);
      }

      const data = await response.json();

      setResult(data.result);
    } catch (error) {
      console.error("An error occured!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="text-black">
        <form onSubmit={handleSubmit}>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Generate"}
          </button>
        </form>
        <div className="text-white">{result}</div>
      </div>
    </>
  );
};

export default GenerateText;

import React from "react";
import { useState } from "react";
import { CiLocationArrow1 } from "react-icons/ci";

const GenerateText = () => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
   
    try {
      const response = await fetch("http://localhost:3001/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error("Error:", error);
      setResult("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-black mr-[-500px] mt-[1000px] absolute bottom-[50px] right-[600px] w-[400px] duration-300 transition-transform">
        <img src="/images/aiIcon.png" alt="Chat Bot Icon" className="w-12 h-12" />
        <div className="bg-white w-full h-[400px] rounded-md mb-5 p-5">
          {result}
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center gap-2 w-full"
        >
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="rounded p-2 outline-none w-full"
            placeholder="Ask something..."
          />
          <button type="submit" disabled={loading}>
            {loading ? (
              <>
                <p className="bg-white px-5 py-2 rounded-md text-lg">
                  Generating...
                </p>
              </>
            ) : (
              <>
                <button className="bg-green-500 px-5 py-2 rounded-md text-white text-lg">
                <CiLocationArrow1 className="text-2xl"/>
                </button>
              </>
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default GenerateText;

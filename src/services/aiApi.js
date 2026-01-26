// src/services/aiApi.js
export async function generateAIText(prompt) {
  try {
    const res = await fetch("http://localhost:5000/api/generate", { // backend endpoint
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch from AI API");
    }

    const data = await res.json();
    return data.text;
  } catch (err) {
    console.error("Error in AI API call:", err);
    return "Error generating AI text";
  }
}

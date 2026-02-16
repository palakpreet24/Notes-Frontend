import { useState } from "react";
import axios from "axios";
import { createNote } from "../services/notesApi";
import { useNavigate } from "react-router-dom";


function AIPage() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
 const navigate = useNavigate();
 const [loading, setLoading] = useState(false);

  const generateText = async () => {
    setLoading(true);
    const res = await axios.post("http://localhost:5000/api/ai/generate", {
      prompt,
    });
    
    setLoading(false);
    
    setResponse(res.data.text);
  };

  const handleSaveAsNote = async () => {
  await createNote({
    title: "AI Generated Note",
    content: response,
  });

  navigate("/notes");
};

return (
  <div className="ai-container">
    <div className="ai-card">
      <h1>✨ Generate Text with AI</h1>

      <textarea
        placeholder="Tell AI what to write..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      {/* <button onClick={generateText}>
        Generate 🚀
      </button> */}
      <button onClick={generateText} disabled={loading}>
  {loading ? "⏳ Generating..." : "Generate 🚀"}
</button>


      {response && (
        <div className="ai-response">
          <h3>AI Response:</h3>
          <p>{response}</p>
        </div>
      )}

    
        <button
  onClick={() => navigate("/")}
  style={{
    marginTop: "20px",
    padding: "10px 20px",
    background: "#2196f3",
    color: "white",
    border: "none",
    cursor: "pointer",
  }}
>
  Go To Home 🏠
</button>

{response && (<button onClick={handleSaveAsNote}
  style={{
    marginTop: "20px",
    padding: "10px 20px",
    background: "#f32121",
    color: "white",
    border: "none",
    cursor: "pointer",
  }}
  >
  Save As Note 📝
</button>
)}
    </div>
  </div>
);


}
export default AIPage;

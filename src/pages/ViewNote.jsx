import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getNoteById } from "../services/notesApi";
import { generateAIText } from "../services/aiApi"; 

function ViewNote() {
  const { id } = useParams();          // URL se id
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  const [aiOutput, setAiOutput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  

  useEffect(() => {
    async function fetchNote() {
      try {
        const res = await getNoteById(id);
        setNote(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchNote();
  }, [id]);

   async function handleGenerateAI() {
    if (!note) return;

    setAiLoading(true);
    const aiText = await generateAIText(note.content);
    setAiOutput(aiText);
    setAiLoading(false);
  }


  // 🟡 Loading state
  if (loading) {
    return (
      <p style={{ color: "white", padding: "40px" }}>
        Loading note...
      </p>
    );
  }

  // 🔴 Note not found safety
  if (!note) {
    return (
      <p style={{ color: "white", padding: "40px" }}>
        Note not found ❌
      </p>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#121212",
        padding: "40px",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "20px",
          marginRight: "10px",
          padding: "8px 14px",
          borderRadius: "6px",
          background: "#2a2a2a",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        ← Back
      </button>

 <button
    onClick={() => navigate("/")}
    style={{
      padding: "8px 14px",
      borderRadius: "8px",
      border: "none",
      background: "#2196f3",
      color: "white",
      cursor: "pointer",
    }}
  >
    🏠 Go To Home
  </button>

      <h1 style={{ marginBottom: "20px" }}>{note.title}</h1>

      <p
        style={{
          whiteSpace: "pre-wrap",
          lineHeight: "1.7",
          opacity: 0.9,
          fontSize: "16px",
        }}
      >
        {note.content}
      </p>
         {/* AI Button */}
      <button onClick={handleGenerateAI} disabled={aiLoading} style={{ marginTop: "1rem" }}>
        {aiLoading ? "Generating..." : "Generate AI Summary"}
      </button>

      {/* AI Output */}
      {aiOutput && (
        <div style={{ marginTop: "1rem", border: "1px solid gray", padding: "1rem" }}>
          <h4>AI Summary:</h4>
          <p>{aiOutput}</p>
        </div>
      )}
    </div>
  );
}

export default ViewNote;


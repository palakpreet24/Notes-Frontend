import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getNoteById, updateNote } from "../services/notesApi";

function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    async function fetchNote() {
      const res = await getNoteById(id);
      setTitle(res.data.title);
      setContent(res.data.content);
    }

    fetchNote();
  }, [id]);

  async function handleUpdate() {
    await updateNote(id, { title, content });
    navigate(`/note/${id}`);
  }

  return (
    <div style={{ padding: "40px", background: "#121212", minHeight: "100vh", color: "white" }}>
      <h2>Edit Note</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        style={{ width: "100%", padding: "10px" }}
      />

      <button
        onClick={handleUpdate}
        style={{
          marginTop: "15px",
          marginRight: "10px",
          padding: "10px 20px",
          background: "#4caf50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Save Changes ✅
      </button>

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

    </div>
  );
}

export default EditNote;

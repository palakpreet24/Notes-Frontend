import { useEffect, useState } from "react";
import { getNotes, createNote,deleteNote,updateNote} from "./services/notesApi";


function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState(null);


  // 🔹 Backend se notes lao
  async function fetchNotes() {
    try {
      const res = await getNotes();
      setNotes(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  // 🔹 Page load pe call ho
  useEffect(() => {
    fetchNotes();
  }, []);

  // 🔹 Backend me note save karo
async function handleAddNote() {
  if (!title || !content) return;

  try {
    if (editId) {
      // UPDATE
      await updateNote(editId, { title, content });
      setEditId(null);
    } else {
      // CREATE
      await createNote({ title, content });
    }

    fetchNotes();
    setTitle("");
    setContent("");
  } catch (err) {
    console.log(err);
  }
}


  async function handleDelete(id) {
  try {
    await deleteNote(id);
    fetchNotes(); // DB se fresh notes
  } catch (err) {
    console.log(err);
  }
}

function handleEdit(note) {
  setTitle(note.title);
  setContent(note.content);
  setEditId(note._id);
}

  return (
  <div
    style={{
      minHeight: "100vh",
      backgroundColor: "#121212",
      padding: "40px 10px",
      color: "white",
      fontFamily: "sans-serif",
      display: "flex",
justifyContent: "center",
      alignItems: "flex-start",
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: "600px",
        padding: "25px",
        borderRadius: "15px",
        backgroundColor: "#1e1e1e",
        boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        📝 My Notes App
      </h1>

      {/* FORM */}
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "10px",
          borderRadius: "8px",
          border: "none",
          outline: "none",
          backgroundColor: "#2a2a2a",
          color: "white",
        }}
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
          borderRadius: "8px",
          border: "none",
          outline: "none",
          minHeight: "120px",
          backgroundColor: "#2a2a2a",
          color: "white",
        }}
      />

      <button
        onClick={handleAddNote}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: editId ? "#2196f3" : "#4caf50",
          color: "white",
          fontSize: "16px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        {editId ? "Update Note ✏️" : "Add Note ➕"}
      </button>

      {/* NOTES LIST */}
      {notes.map((note) => (
        <div
          key={note._id}
          style={{
            backgroundColor: "#ffffff",
            color: "#000",
            borderRadius: "10px",
            padding: "15px",
            marginBottom: "15px",
          }}
        >
          <h3 style={{ marginBottom: "5px" }}>{note.title}</h3>
          <p style={{ opacity: 0.8 }}>{note.content}</p>

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button
              onClick={() => handleEdit(note)}
              style={{
                flex: 1,
                backgroundColor: "#2196f3",
                color: "white",
                border: "none",
                padding: "8px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(note._id)}
              style={{
                flex: 1,
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                padding: "8px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default App;

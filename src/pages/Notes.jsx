import { useEffect, useState } from "react";
import { getNotes, deleteNote } from "../services/notesApi";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Notes() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  async function fetchNotes() {
    try {
      const res = await getNotes();
      setNotes(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  function goToHome() {
    navigate("/");
  }

  function handleEdit(noteId) {
    navigate(`/note/edit/${noteId}`);
  }

  async function handleDelete(id) {
    try {
      await deleteNote(id);
      fetchNotes();
      toast.success("Note deleted 🗑️");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed ❌");
    }
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
          maxWidth: "950px",
          padding: "30px",
          borderRadius: "15px",
          backgroundColor: "#1e1e1e",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h1 style={{ margin: 0 }}>📒 All Notes</h1>

          <button
            onClick={goToHome}
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              border: "1px solid #444",
              backgroundColor: "#2a2a2a",
              color: "white",
              cursor: "pointer",
            }}
          >
            ➕ New
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {notes.map((note) => (
            <div
              key={note._id}
              onClick={() => navigate(`/note/${note._id}`)}
              style={{
                backgroundColor: "#414040ff",
                padding: "15px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                cursor: "pointer",
              }}
            >
              <h3
                style={{
                  marginBottom: "6px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {note.title}
              </h3>

              <p
                style={{
                  opacity: 0.8,
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {note.content}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  marginTop: "12px",
                }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(note._id);
                  }}
                  style={{
                    flex: 1,
                    backgroundColor: "#2196f3",
                    color: "white",
                    border: "none",
                    padding: "7px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Edit ✏️
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(note._id);
                  }}
                  style={{
                    flex: 1,
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    padding: "7px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Delete 🗑
                </button>
              </div>
            </div>
          ))}
        </div>

        <Toaster position="top-right" reverseOrder={true} />
      </div>
    </div>
  );
}

export default Notes;

import { useState } from "react";
import { createNote, updateNote } from "../services/notesApi";
import { useNavigate } from "react-router-dom";


function Home() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editId, setEditId] = useState(null);
    const navigate = useNavigate();

    function goToNotes() {
        navigate("/notes");
    }

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

            setTitle("");
            setContent("");
        } catch (err) {
            console.log(err);
        }
        // 👇 Note save hone ke baad notes page pe bhej do
        navigate("/notes");
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
                <button
                    onClick={goToNotes}
                    style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #555",
                        backgroundColor: "transparent",
                        color: "white",
                        fontSize: "16px",
                        cursor: "pointer",
                    }}
                >
                    📒 View All Notes
                </button>
            </div>
        </div>

    );
}

export default Home;

import API from "./api";

// GET all notes
export const getNotes = () => API.get("/notes");

// ✅ GET single note by ID
export const getNoteById = (id) => API.get(`/notes/${id}`);

// CREATE note
export const createNote = (data) => API.post("/notes", data);

// DELETE note
export const deleteNote = (id) => API.delete(`/notes/${id}`);

// UPDATE note
export const updateNote = (id, data) =>
  API.put(`/notes/${id}`, data);

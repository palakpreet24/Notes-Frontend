import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import ViewNote from "./pages/ViewNote";
import AIPage from "./pages/AIPage";
import EditNote from "./pages/EditNote";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/note/:id" element={<ViewNote />} />
        <Route path="/note/edit/:id" element={<EditNote />} />
        <Route path="/ai" element={<AIPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

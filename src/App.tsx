
import { Routes,Route } from "react-router-dom";
import Artist from "./pages/Artist";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="artist/:id" element={<Artist />} />
    </Routes>
  );
}

export default App;

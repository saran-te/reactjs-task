import "./styles.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GridDisplay from "./components/grid/GridDisplay";
import GridDataUpdate from "./components/grid/GridDataUpdate";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="grid-data" element={<GridDisplay />} />
          <Route path="update-data" element={<GridDataUpdate />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

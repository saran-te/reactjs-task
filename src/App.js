import "./styles.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GridDisplay from "./components/grid/GridDisplay";
import GridDataUpdate from "./components/grid/GridDataUpdate";
import OrgHierarchy1 from "./components/TreeData/OrgHierarchy1";
import FileExample from "./components/TreeData/FileExample";
import Ssrm from "./components/ssrm/Ssrm";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="grid-data" element={<GridDisplay />} />
          <Route path="update-data" element={<GridDataUpdate />} />
          <Route path="org-tree-data" element={<OrgHierarchy1 />} />
          <Route path="file-tree-data" element={<FileExample />} />
          <Route path="ssrm" element={<Ssrm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

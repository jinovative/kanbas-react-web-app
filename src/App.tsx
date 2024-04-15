import Labs from "./Labs";

import Kanbas from "./Kanbas";
// import User from "./User";
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/Labs" />} />
          <Route path="/Labs/*" element={<Labs />} />
          <Route path="/Kanbas/*" element={<Kanbas />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
export default App;

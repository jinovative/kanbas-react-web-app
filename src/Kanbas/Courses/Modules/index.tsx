import { FaCheck, FaEllipsisV } from "react-icons/fa";
import ModuleList from "./List";
function Modules() {
  return (
    <div
      className="col-12"
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "20px 0",
        padding: "20px",
        height: "calc(100vh - 100px)",
        overflowY: "auto",
      }}
    >
      <ModuleList />
    </div>
  );
}
export default Modules;

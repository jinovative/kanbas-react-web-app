import React, { useState } from "react";
import "./index.css";
import { FaCheck } from "react-icons/fa";
import { modules } from "../../Database";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router";
function ModuleList() {
  const { courseId } = useParams();
  const modulesList = modules.filter((module) => module.course === courseId);
  const [selectedModule, setSelectedModule] = useState(modulesList[0]);
  return (
    <>
      <div className="col-8">
        <div className="container header-section">
          <button type="button">Collapse All</button>
          <button type="button">View Progress</button>
          <button
            type="button"
            style={{ backgroundColor: "#5cb85c", color: "#ffffff" }}
          >
            <FaCheck /> Publish All{" "}
          </button>
          <button
            type="button"
            style={{ backgroundColor: "#d9534f", color: "#ffffff" }}
          >
            + Module
          </button>
          <button type="button" style={{ color: "red" }}>
            <FaEllipsisV />
          </button>
        </div>
        <hr className="separator-line second-nav-bar" />
        <ul className="list-group wd-modules">
          {modulesList.map((module) => (
            <li
              className="list-group-item"
              onClick={() => setSelectedModule(module)}
            >
              <div>
                <FaEllipsisV className="me-2" />
                {module.name}
                <span className="float-end">
                  <FaCheckCircle className="text-success" />
                  <FaPlusCircle className="ms-2" />
                  <FaEllipsisV className="ms-2" />
                </span>
              </div>
              {selectedModule._id === module._id && (
                <ul className="list-group">
                  {module.lessons?.map((lesson) => (
                    <li className="list-group-item">
                      <FaEllipsisV className="me-2" />
                      {lesson.name}
                      <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        <FaEllipsisV className="ms-2" />
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default ModuleList;

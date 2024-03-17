import React, { useState } from "react";
import { useParams } from "react-router";

import { useSelector, useDispatch } from "react-redux";
import { addModule, deleteModule, updateModule, setModule } from "./reducer";
import { KanbasState } from "../../store";

import "./index.css";
import { modules } from "../../Database";
import {
  FaCheck,
  FaEllipsisV,
  FaCheckCircle,
  FaPlusCircle,
} from "react-icons/fa";

function ModuleList() {
  const { courseId } = useParams();
  const initialModulesList = modules.filter(
    (module) => module.course === courseId
  );
  const [moduleList, setModuleList] = useState(initialModulesList);
  const [selectedModule, setSelectedModule] = useState(moduleList[0]);

  // ===================================================================
  const [module, setModule] = useState({
    name: "New Module",
    description: "New Description",
    course: courseId,
  });

  const addModule = (newModule: any) => {
    const newModuleWithId = {
      ...newModule,
      _id: new Date().getTime().toString(),
    };
    setModuleList([newModuleWithId, ...moduleList]);
  };
  const deleteModule = (module: any) => {
    const newModuleList = moduleList.filter((m) => m._id !== module._id);
    setModuleList(newModuleList);
  };
  const updateModule = (module: any) => {
    const newModuleList = moduleList.map((m) =>
      m._id === module._id ? module : m
    );
    setModuleList(newModuleList);
  };

  return (
    <>
      <div className="col-auto">
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

        {/* ===================================================================================== */}

        <ul className="list-group wd-modules">
          <li className="list-group-item">
            <button onClick={() => addModule(module)}>Add</button>
            <button onClick={() => updateModule(module)}>Update</button>

            <input
              value={module.name}
              onChange={(e) =>
                setModule({
                  ...module,
                  name: e.target.value,
                })
              }
            />
            <textarea
              value={module.description}
              onChange={(e) =>
                setModule({
                  ...module,
                  description: e.target.value,
                })
              }
            />
          </li>

          {moduleList
            .filter((module) => module.course === courseId)
            .map((module) => (
              <li
                key={module._id}
                className="list-group-item"
                onClick={() => setSelectedModule(module)}
              >
                <button onClick={() => deleteModule(module)}>Delete</button>
                <button
                  onClick={(event) => {
                    setModule(module);
                  }}
                >
                  Edit
                </button>

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

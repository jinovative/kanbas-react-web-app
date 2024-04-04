import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as client from "./client";
import { useSelector, useDispatch } from "react-redux";
import {
  addModule as addModuleAction,
  deleteModule as deleteModuleAction,
  updateModule as updateModuleAction,
  setModule,
  setModules,
} from "./reducer";
import { findModulesForCourse, createModule } from "./client";
import { KanbasState } from "../../store";

import "./index.css";

import {
  FaCheck,
  FaEllipsisV,
  FaCheckCircle,
  FaPlusCircle,
} from "react-icons/fa";

import Database from "../../Database";
import { add } from "../../../Labs/a4/ReduxExamples/AddRedux/addReducer";

function ModuleList() {
  const { modules } = Database;
  const dispatch = useDispatch();
  const { courseId } = useParams();

  useEffect(() => {
    findModulesForCourse(courseId).then((modules) =>
      dispatch(setModules(modules))
    );
  }, [courseId]);

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
  const handleAddModule = () => {
    createModule(courseId, module).then((module) => {
      dispatch(addModuleAction(module));
    });
  };
  const handleDeleteModule = (moduleId: string) => {
    client.deleteModule(moduleId).then((status) => {
      dispatch(deleteModuleAction(moduleId));
    });
  };
  const handleUpdateModule = async () => {
    const status = await client.updateModule(module);
    dispatch(updateModuleAction(module));
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
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <input
                type="text"
                className="form-control mb-2" // Bootstrap class for inputs with margin-bottom
                value={module.name}
                onChange={(e) =>
                  setModule({
                    ...module,
                    name: e.target.value,
                  })
                }
              />
              <textarea
                className="form-control" // Bootstrap class for textareas
                value={module.description}
                onChange={(e) =>
                  setModule({
                    ...module,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <button
                className="module_button btn btn-primary"
                style={{ backgroundColor: "blue", color: "white" }}
                onClick={handleUpdateModule}
              >
                Update
              </button>
              <button
                className="module_button btn btn-secondary"
                onClick={handleAddModule}
              >
                Add
              </button>
            </div>
          </li>

          {moduleList
            .filter((module) => module.course === courseId)
            .map((module) => (
              <li
                key={module._id}
                className="list-group-item"
                onClick={() => setSelectedModule(module)}
              >
                <div>
                  <button
                    className="module_button btn btn-primary"
                    style={{ backgroundColor: "red", color: "white" }}
                    onClick={() => handleDeleteModule(module._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="module_button btn btn-secondary"
                    onClick={(event) => {
                      setModule(module);
                    }}
                  >
                    Edit
                  </button>
                </div>
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

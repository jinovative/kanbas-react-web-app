import React from "react";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { assignments } from "../../Database";
function Assignments() {
  const { courseId } = useParams();
  const assignmentList = assignments.filter(
    (assignment) => assignment.course === courseId
  );
  return (
    <>
      <div
        className="home-flex-container"
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "20px 0",
          padding: "20px",
          height: "calc(100vh - 100px)",
          overflowY: "auto",
        }}
      >
        <div>
          <div className="d-flex w-100">
            <div>
              <input
                type="text"
                className="form-control col-4"
                placeholder="Search for Assignment"
              />
            </div>

            <div className="ms-auto d-flex">
              <button className="btn btn-outline-secondary" type="button">
                +Group
              </button>
              <button className="btn btn-danger" type="button">
                +Assignment
              </button>
              <a href="">
                <button className="btn btn-outline-secondary" type="button">
                  <FaEllipsisV />
                </button>
              </a>
            </div>
          </div>
          <ul className="list-group wd-modules">
            <li className="list-group-item">
              <div>
                <FaEllipsisV className="me-2" /> ASSIGNMENTS
                <span className="float-end">
                  <FaCheckCircle className="text-success" />
                  <FaPlusCircle className="ms-2" />
                  <FaEllipsisV className="ms-2" />
                </span>
              </div>
              <ul className="list-group">
                {assignmentList.map((assignment) => (
                  <li className="list-group-item">
                    <FaEllipsisV className="me-2" />
                    <Link
                      to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
                    >
                      {assignment.title}
                    </Link>
                    <span className="float-end">
                      <FaCheckCircle className="text-success" />
                      <FaEllipsisV className="ms-2" />
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
export default Assignments;

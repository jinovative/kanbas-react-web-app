import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import { KanbasState } from "../../store";
import { Assignment, deleteAssignment } from "./assignmentsReducer";

function Assignments() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId } = useParams<{ courseId: string }>();

  // useSelector의 타입을 수정합니다.
  const assignmentList = useSelector((state: KanbasState) =>
    state.assignments.assignments.filter(
      (assignment: Assignment) => assignment.course === courseId
    )
  );

  const handleAddAssignmentClick = () => {
    navigate(`/Kanbas/Courses/${courseId}/Assignments/Editor/`);
  };

  const handleDeleteAssignmentClick = (assignmentId: string) => {
    dispatch(deleteAssignment({ _id: assignmentId }));
  };

  return (
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
          <button
            className="btn btn-danger"
            type="button"
            onClick={handleAddAssignmentClick}
          >
            +Assignment
          </button>
          <button className="btn btn-outline-secondary" type="button">
            <FaEllipsisV />
          </button>
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
            {assignmentList.map((assignment: Assignment) => (
              <li className="list-group-item" key={assignment._id}>
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
                <button
                  className="btn btn-outline-primary "
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "5px",
                    marginLeft: "auto",
                    display: "block",
                  }}
                  type="button"
                  onClick={() => handleDeleteAssignmentClick(assignment._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Assignments;

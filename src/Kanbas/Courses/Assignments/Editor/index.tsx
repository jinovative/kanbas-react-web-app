import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "../assignmentsReducer";

function AssignmentEditor() {
  const dispatch = useDispatch();

  const { assignmentId } = useParams<{
    assignmentId?: string;
    courseId: string;
  }>();
  const courseId = useParams().courseId as string;
  const navigate = useNavigate();
  const isNewAssignment = !assignmentId;

  const [assignment, setAssignment] = useState({
    _id: assignmentId || new Date().getTime().toString(),
    title: "",
    course: courseId,
    description: "",
    points: 100,
    dueDate: "",
    availableFrom: "",
    untilDate: "",
  });

  const handleSave = () => {
    if (isNewAssignment) {
      dispatch(addAssignment(assignment));
    } else {
      dispatch(updateAssignment(assignment));
    }
    navigate(`/Kanbas/Courses/${courseId}/Assignments`);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAssignment({ ...assignment, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    dispatch(
      addAssignment({ ...assignment, _id: new Date().getTime().toString() })
    );
    navigate(`/Kanbas/Courses/${courseId}/Assignments`);
  };
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
      <h5>Assignment Name</h5>
      <input value={assignment?.title} className="form-control mb-2" />
      <input
        name="title"
        value={assignment.title}
        onChange={handleChange}
        className="form-control mb-2"
        placeholder="Assignment Name"
      />
      <textarea
        name="description"
        value={assignment.description}
        onChange={handleChange}
        className="form-control mb-2"
        placeholder="New Assignment Description"
        rows={4}
      />
      <label>Points</label>
      <input
        name="points"
        type="number"
        value={assignment.points}
        onChange={handleChange}
        className="form-control mb-2"
        placeholder="Points"
      />
      <label>Assign</label>
      <input
        name="dueDate"
        type="date"
        value={assignment.dueDate}
        onChange={handleChange}
        className="form-control mb-2"
        placeholder="Due"
      />
      <div className="d-flex">
        <input
          name="availableFrom"
          type="date"
          value={assignment.availableFrom}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Available from"
        />
        <input
          name="untilDate"
          type="date"
          value={assignment.untilDate}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Until"
        />
      </div>
      <div className="float-end">
        <Link
          to={`/Kanbas/Courses/${courseId}/Assignments`}
          className="btn btn-danger ms-2"
        >
          Cancel
        </Link>
        <button onClick={handleSave} className="btn btn-success ms-2">
          Update
        </button>
        <button onClick={handleAdd} className="btn btn-success ms-2">
          Add
        </button>
      </div>
    </div>
  );
}
export default AssignmentEditor;

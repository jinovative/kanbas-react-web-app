import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addQuiz, updateQuiz } from "../quizzReducer";

function QuizDetailEditor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { quizId } = useParams<{ quizId?: string; courseId: string }>();
  const courseId = useParams().courseId as string;
  const isNewQuiz = !quizId;

  const [quiz, setQuiz] = useState({
    _id: quizId || new Date().getTime().toString(),
    title: "",
    course: courseId,
    description: "",
    quizType: "Graded Quiz",
    assignmentGroup: "ASSIGNMENTS",
    options: {
      shuffleAnswers: false,
      timeLimit: 0,
      multipleAttempts: false,
    },
  });

  const handleSave = () => {
    if (isNewQuiz) {
      dispatch(addQuiz(quiz));
    } else {
      dispatch(updateQuiz(quiz));
    }
    navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
  };
  const [activeTab, setActiveTab] = useState<"detail" | "question">("detail");
  const handleTabChange = (tabName: "detail" | "question") => {
    setActiveTab(tabName);
    if (tabName === "question") {
      navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/question`);
    }
  };

  // ========================================
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setQuiz({ ...quiz, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setQuiz({ ...quiz, options: { ...quiz.options, [name]: checked } });
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQuiz({ ...quiz, options: { ...quiz.options, [name]: Number(value) } });
  };
  // ========================================

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
      <div className="nav nav-tabs">
        <button
          className={`nav-link ${activeTab === "detail" ? "active" : ""}`}
          onClick={() => handleTabChange("detail")}
        >
          Details
        </button>

        <button
          className={`nav-link ${activeTab === "question" ? "active" : ""}`}
          onClick={() => handleTabChange("question")}
        >
          Questions
        </button>
      </div>
      <input
        name="title"
        value={quiz.title}
        onChange={handleInputChange}
        className="form-control mb-2"
        placeholder="Unnamed Quiz"
      />

      <h5>Quiz Instructions:</h5>
      <textarea
        name="description"
        value={quiz.description}
        onChange={handleInputChange}
        className="form-control mb-2"
        placeholder="Quiz Instructions"
        rows={4}
      />
      <label>Quiz Type</label>
      <select
        name="quizType"
        value={quiz.quizType}
        className="form-control mb-2"
      >
        <option value="Graded Quiz">Graded Quiz</option>
      </select>
      <label>Assignment Group</label>
      <select
        name="assignmentGroup"
        value={quiz.assignmentGroup}
        className="form-control mb-2"
      >
        <option value="ASSIGNMENTS">ASSIGNMENTS</option>
      </select>
      <h5>Options</h5>
      <div>
        <input
          name="shuffleAnswers"
          type="checkbox"
          checked={quiz.options.shuffleAnswers}
        />
        <label>Shuffle Answers</label>
      </div>
      <div>
        <input
          name="timeLimit"
          type="number"
          value={quiz.options.timeLimit}
          className="form-control mb-2"
          placeholder="Time Limit (minutes)"
        />
      </div>
      <div>
        <input
          name="multipleAttempts"
          type="checkbox"
          checked={quiz.options.multipleAttempts}
        />
        <label>Allow Multiple Attempts</label>
      </div>

      <h5>Assign</h5>
      <div className="mb-3">
        <label className="form-label">Assign to</label>
        <input
          type="text"
          name="assignTo"
          className="form-control"
          placeholder="Assign to"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Due</label>
        <input type="datetime-local" name="dueDate" className="form-control" />
      </div>
      <div className="row">
        <div className="col">
          <label className="form-label">Available from</label>
          <input
            type="datetime-local"
            name="availableFrom"
            className="form-control"
          />
        </div>
        <div className="col">
          <label className="form-label">Until</label>
          <input
            type="datetime-local"
            name="untilDate"
            className="form-control"
          />
        </div>
      </div>

      <div className="float-end">
        <Link
          to={`/Kanbas/Courses/${courseId}/Quizzes`}
          className="btn btn-danger ms-2"
        >
          Cancel
        </Link>
        <button onClick={handleSave} className="btn btn-success ms-2">
          {isNewQuiz ? "Create" : "Update"} Quiz
        </button>
      </div>
    </div>
  );
}
export default QuizDetailEditor;

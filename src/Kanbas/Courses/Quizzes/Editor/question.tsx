import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addQuiz, updateQuiz, selectQuizById } from "../quizzReducer";
import { KanbasState } from "../../../store";
interface Answer {
  text: string;
  isCorrect: boolean;
}

interface Question {
  title: string;
  type: string;
  points: number;
  questionText: string;
  answers: Answer[];
}

function QuizQuestionEditor() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { quizId } = useParams<{ quizId?: string; courseId: string }>();
  const courseId = useParams().courseId as string;
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

  const [activeTab, setActiveTab] = useState<"details" | "questions">(
    "questions"
  );
  const handleTabChange = (tabName: "details" | "questions") => {
    setActiveTab(tabName);
    if (tabName === "details") {
      navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/detail`);
    } else {
      navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/question`);
    }
  };

  const isNewQuestion = !quizId;

  const handleSave = () => {
    if (isNewQuestion) {
      dispatch(addQuiz(quiz));
    } else {
      dispatch(updateQuiz(quiz));
    }
    navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
  };

  const [question, setQuestion] = useState<Question | null>(null);

  const handleNewQuestion = () => {
    const newQuestion = {
      title: "",
      type: "Multiple Choice",
      points: 1,
      questionText: "",
      answers: [{ text: "", isCorrect: false }],
    };
    setQuestion(newQuestion);
  };

  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPoints = Number(e.target.value);
    setQuestion((prevQuestion) => {
      if (prevQuestion === null) return null;
      return { ...prevQuestion, points: newPoints };
    });
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
      <div className="nav nav-tabs">
        <button
          className={`nav-link ${activeTab === "details" ? "active" : ""}`}
          onClick={() => handleTabChange("details")}
        >
          Details
        </button>

        <button
          className={`nav-link ${activeTab === "questions" ? "active" : ""}`}
          onClick={() => handleTabChange("questions")}
        >
          Questions
        </button>
      </div>

      {/* ==================== */}
      {question && (
        <div>
          <div className="form-group">
            <label className="form-label" htmlFor="question-type">
              Question Title
            </label>
            <select
              className="form-control"
              id="question-type"
              value={question.type}
              onChange={(e) =>
                setQuestion({ ...question, type: e.target.value })
              }
            >
              <option value="Multiple Choice">Multiple Choice</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="question-text">
              Question:
            </label>
            <textarea
              className="form-control"
              id="question-text"
              value={question.questionText}
              onChange={(e) =>
                setQuestion({ ...question, questionText: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="answers">
              Answers:
            </label>
            {question.answers.map((answer, index) => (
              <div key={index} className="form-row">
                <div className="col">
                  <input
                    className="form-control"
                    type="text"
                    value={answer.text}
                    onChange={(e) => {
                      const newAnswers = [...question.answers];
                      newAnswers[index] = { ...answer, text: e.target.value };
                      setQuestion({ ...question, answers: newAnswers });
                    }}
                  />
                </div>
                <div className="col">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={answer.isCorrect}
                    onChange={(e) => {
                      const newAnswers = [...question.answers];
                      newAnswers[index] = {
                        ...answer,
                        isCorrect: e.target.checked,
                      };
                      setQuestion({ ...question, answers: newAnswers });
                    }}
                  />
                  <label className="form-check-label">Correct Answer</label>
                </div>
              </div>
            ))}
            <button
              className="btn btn-primary"
              onClick={() =>
                setQuestion({
                  ...question,
                  answers: [
                    ...question.answers,
                    { text: "", isCorrect: false },
                  ],
                })
              }
            >
              Add Another Answer
            </button>
          </div>
        </div>
      )}
      {/* ==================== */}
      <div>
        <button className="btn btn-secondary" onClick={handleNewQuestion}>
          New Question
        </button>
      </div>
      {/* ==================== */}
      <div className="float-end">
        <Link
          to={`/Kanbas/Courses/${courseId}/Quizzes`}
          className="btn btn-danger ms-2"
        >
          Cancel
        </Link>
        <button onClick={handleSave} className="btn btn-success ms-2">
          {isNewQuestion ? "Create" : "Update"} Quiz
        </button>
      </div>
    </div>
  );
}

export default QuizQuestionEditor;

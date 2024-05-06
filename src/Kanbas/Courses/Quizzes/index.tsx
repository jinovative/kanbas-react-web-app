import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteQuiz, addQuiz, getQuizzesForCourse } from "./quizzReducer";
import { KanbasState } from "../../store";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";

function Quizzes() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId } = useParams<{ courseId: string }>();
  const quizzes = useSelector((state: KanbasState) =>
    courseId ? getQuizzesForCourse(state, courseId) : []
  );

  useEffect(() => {}, [courseId]);

  if (!courseId) {
    return <div>Course not found</div>;
  }

  const handleAddQuiz = () => {
    const newQuiz = {
      _id: `quiz${Math.random()}`,
      title: "New Quiz",
      course: courseId,
    };
    dispatch(addQuiz(newQuiz));
  };

  const handleDeleteQuiz = (quizId: string) => {
    dispatch(deleteQuiz(quizId));
  };

  return (
    <div>
      <h1>Quizzes</h1>
      <button onClick={handleAddQuiz}>+ Quiz</button>
      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <div>
            <FaEllipsisV className="me-2" /> QUIZZES
            <span className="float-end">
              <FaCheckCircle className="text-success" />
              <FaPlusCircle className="ms-2" />
              <FaEllipsisV className="ms-2" />
            </span>
          </div>
          <ul>
            {quizzes.map((quiz) => (
              <li className="list-group-item" key={quiz._id}>
                <div>
                  <FaEllipsisV className="me-2" />
                  <Link
                    to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/preview`}
                  >
                    {quiz.title}
                  </Link>
                  <span className="float-end">
                    <FaCheckCircle className="text-success" />
                    <FaPlusCircle className="ms-2" />
                    <FaEllipsisV className="ms-2" />
                  </span>
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteQuiz(quiz._id)}
                >
                  Delete
                </button>
                <Link
                  to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/detail`}
                >
                  <button className="btn btn-warning">edit</button>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Quizzes;

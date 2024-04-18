import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import { Answer, setCurrentQuestion } from "../quizzReducer";

function Preview() {
  const quiz = useSelector((state: KanbasState) => state.quizzes.currentQuiz);
  const question = useSelector(
    (state: KanbasState) => state.quizzes.currentQuiz
  );
  useEffect(() => {
    if (question) {
      dispatch(setCurrentQuestion(question));
    }
  }, [question, dispatch]);

  return (
    <div>
      <h1>{quiz?._id || "No Quiz ID"}</h1>
      <h1>Quiz Instructions: {quiz?.description || "No Instructions"}</h1>

      {question && (
        <div>
          <ul>
            <li>Question</li>
            <li>Question: {question.questionText || "No Question"}</li>
            <li>
              True or False:{" "}
              {question.answers.some((ans: Answer) => ans.isCorrect)
                ? "True"
                : "False"}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Preview;
function dispatch(arg0: { type: string; payload: any }) {
  throw new Error("Function not implemented.");
}

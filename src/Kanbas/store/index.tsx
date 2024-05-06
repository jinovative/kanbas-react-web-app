import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/reducer";
import assignmentsReducer from "../Courses/Assignments/assignmentsReducer";
import { Assignment } from "../Courses/Assignments/assignmentsReducer";
import quizzesReducer from "../Courses/Quizzes/quizzReducer";
import { Quiz } from "../Courses/Quizzes/quizzReducer";

export interface KanbasState {
  modulesReducer: {
    modules: any[];
    module: any;
  };
  assignments: {
    assignments: Assignment[];
  };
  quizzes: {
    currentQuiz: any;
    quizzes: Quiz[];
  };
}

const store = configureStore({
  reducer: {
    modulesReducer,
    assignments: assignmentsReducer,
    quizzes: quizzesReducer,
  },
});

export default store;

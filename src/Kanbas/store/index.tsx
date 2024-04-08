import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/reducer";
import assignmentsReducer from "../Courses/Assignments/assignmentsReducer";
import { Assignment } from "../Courses/Assignments/assignmentsReducer";

export interface KanbasState {
  modulesReducer: {
    modules: any[];
    module: any;
  };
  assignments: {
    assignments: Assignment[];
  };
}

const store = configureStore({
  reducer: {
    modulesReducer,
    assignments: assignmentsReducer,
  },
});

export default store;

import { createSlice } from "@reduxjs/toolkit";
import * as db from "../../Database";

interface AssignmentAction {
  type: any;
  payload?: any; // You can further refine this type based on your actual payload structure
}

const initialState = {
  assignments: db.assignments,
};

function assignmentsReducer(state = initialState, action: AssignmentAction) {
  switch (action.type) {
    case "ADD_ASSIGNMENT":
      return {
        ...state,
        assignments: [...state.assignments, action.payload],
      };
    case "DELETE_ASSIGNMENT":
      return {
        ...state,
        assignments: state.assignments.filter(
          (assignment) => assignment._id !== action.payload
        ),
      };
    case "UPDATE_ASSIGNMENT":
      return {
        ...state,
        assignments: state.assignments.map((assignment) =>
          assignment._id === action.payload.id ? action.payload : assignment
        ),
      };
    case "SELECT_ASSIGNMENT":
      // Implement as needed for your app
      return state;
    default:
      return state;
  }
}

export default assignmentsReducer;

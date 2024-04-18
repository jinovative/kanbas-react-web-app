import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import db from "../../Database/index.js";
import { KanbasState } from "../../store/index.js";

// Define the Quiz type
export interface Quiz {
  _id: string;
  title: string;
  course: string;
}

interface Database {
  courses: any[];
  modules: any[];
  assignments: any[];
  users: any[];
  grades: any[];
  enrollments: any[];
  quizzes: Quiz[];
}

// Cast the imported db object to the Database type
const typedDb = db as Database;

// State interface
interface QuizzesState {
  quizzes: Quiz[];
}

// Initial state using local db
const initialState: QuizzesState = {
  quizzes: typedDb.quizzes || [],
};

// Slice definition
const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quizzes.push(action.payload);
    },
    updateQuiz: (state, action: PayloadAction<Quiz>) => {
      const index = state.quizzes.findIndex(
        (quiz) => quiz._id === action.payload._id
      );
      if (index !== -1) {
        state.quizzes[index] = action.payload;
      }
    },
    deleteQuiz: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter(
        (quiz) => quiz._id !== action.payload
      );
    },
    findQuizzesForCourse: (state, action: PayloadAction<string>) => {
      return {
        quizzes: state.quizzes.filter((quiz) => quiz.course === action.payload),
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuizDetails.fulfilled, (state, action) => {
      // Assuming action.payload contains the fetched quiz details
      const quiz = action.payload;
      if (quiz) {
        // You can decide how to merge this quiz into your existing state
        // For instance, you might want to update a specific quiz or add a new one
      }
    });
    // Add cases for pending and rejected if necessary
  },
});
export const getQuizzesForCourse = (state: KanbasState, courseId: string) => {
  return state.quizzes.quizzes.filter((quiz) => quiz.course === courseId);
};
export const selectQuizzesForCourse = (
  state: KanbasState | undefined,
  courseId: string
) => {
  const filteredQuizzes =
    state?.quizzes.quizzes.filter((quiz) => quiz.course === courseId) || [];

  return filteredQuizzes;
};

export const { addQuiz, updateQuiz, deleteQuiz, findQuizzesForCourse } =
  quizzesSlice.actions;
export default quizzesSlice.reducer;
export const fetchQuizDetails = createAsyncThunk(
  "quizzes/fetchQuizDetails",
  async (
    { courseId, quizId }: { courseId: string; quizId: string },
    { getState }
  ) => {
    // Replace this with the actual logic to fetch quiz details
    // For example, an API call would go here
    const state = getState() as KanbasState;
    return state.quizzes.quizzes.find(
      (quiz) => quiz._id === quizId && quiz.course === courseId
    );
  }
);

// Async thunk for saving quiz details
export const saveQuizDetails = createAsyncThunk(
  "quizzes/saveQuizDetails",
  async (quizDetails: Quiz, { getState }) => {
    // Replace this with the actual logic to save quiz details
    // For example, an API call would go here
    const state = getState() as KanbasState;
    const index = state.quizzes.quizzes.findIndex(
      (quiz) => quiz._id === quizDetails._id
    );
    if (index !== -1) {
      state.quizzes.quizzes[index] = quizDetails; // This mutation is just illustrative
      // Normally you would perform an API call and handle the response
    }
  }
);

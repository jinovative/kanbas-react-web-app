import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import db from "../../Database/index.js";
import { KanbasState } from "../../store/index.js";

const QUIZZES_STORAGE_KEY = "kanbas_quizzes";

function saveQuizzesToStorage(quizzes: Quiz[]) {
  localStorage.setItem(QUIZZES_STORAGE_KEY, JSON.stringify(quizzes));
}

function loadQuizzesFromStorage(): Quiz[] {
  const storedQuizzes = localStorage.getItem(QUIZZES_STORAGE_KEY);
  return storedQuizzes ? JSON.parse(storedQuizzes) : [];
}

export interface Quiz {
  _id: string;
  title: string;
  course: string;
  description: string;
  quizType: string;
  assignmentGroup: string;
  options: {
    question: string;
    shuffleAnswers: boolean;
    timeLimit: number;
    multipleAttempts: boolean;
  };
}

export interface Question {
  title: string;
  type: string;
  points: number;
  questionText: string;
  answers: boolean;
}
export interface Answer {
  text: string;
  isCorrect: boolean;
}
interface QuizzesState {
  quizzes: Quiz[];
  currentQuiz?: Quiz;
  currentQuestion?: Question;
}

const initialState: QuizzesState = {
  quizzes: loadQuizzesFromStorage(),
  currentQuiz: undefined,
  currentQuestion: undefined,
};
export const selectQuizById = (state: KanbasState, quizId?: string) => {
  const quiz = state.quizzes.quizzes.find((quiz) => quiz._id === quizId);
  return {
    ...quiz,
    options: quiz?.options || {
      shuffleAnswers: false,
      timeLimit: 0,
      multipleAttempts: false,
    },
  };
};
const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, action) => {
      state.quizzes.push(action.payload);
    },
    updateQuiz: (state, action) => {
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
      saveQuizzesToStorage(state.quizzes);
    },
    findQuizzesForCourse: (state, action: PayloadAction<string>) => {
      return {
        quizzes: state.quizzes.filter((quiz) => quiz.course === action.payload),
      };
    },
    setCurrentQuiz: (state, action: PayloadAction<Quiz>) => {
      state.currentQuiz = action.payload;
    },
    setCurrentQuestion: (state, action: PayloadAction<Question>) => {
      state.currentQuestion = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchQuizDetails.fulfilled, (state, action) => {
      const quiz = action.payload;
      if (quiz) {
      }
    });
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
    const state = getState() as KanbasState;
    return state.quizzes.quizzes.find(
      (quiz) => quiz._id === quizId && quiz.course === courseId
    );
  }
);

export const saveQuizDetails = createAsyncThunk(
  "quizzes/saveQuizDetails",
  async (quizDetails: Quiz, { getState }) => {
    const state = getState() as KanbasState;
    const index = state.quizzes.quizzes.findIndex(
      (quiz) => quiz._id === quizDetails._id
    );
    if (index !== -1) {
      state.quizzes.quizzes[index] = quizDetails;
    }
  }
);

export const setCurrentQuestion = (question: any) => ({
  type: "SET_CURRENT_QUESTION",
  payload: question,
});

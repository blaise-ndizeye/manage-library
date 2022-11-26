import {
  TEACHER_SUCCESS,
  TEACHER_LOADING,
  TEACHER_ADD_SUCCESS,
  TEACHER_DELETE_SUCCESS,
  TEACHER_ERROR,
  DELETE_SUCCESS,
  TEACHER_EDIT_SUCCESS,
  TEACHER_LENDING_TWO_SUCCESS,
  TEACHER_BORROWERS_LIST,
  TEACHER_BORROWEDBOOKS_LIST,
  TEACHER_RECORDS_LIST,
  TEACHER_RETURN_SUCCESS,
  TEACHER_DELETE_BORROWER,
  TEACHER_BORROWEDBOOKS_SEARCH,
  TEACHER_RECORDS_SEARCH,
  TEACHER_LIST_SEARCH,
  TEACHER_BORROWERS_SEARCH,
  DELETE_ALL_TEACHERS,
  DELETE_ALL_TEACHER_RECORDS,
  DELETE_ALL_TEACHER_BORROWERS,
} from "../../actions/actionTypes"

let initialState = {
  success: false,
  teachers: [],
  borrowers: [],
  records: [],
  borrowedBooks: [],
  isLoading: false,
}

export default function teacherReducer(state = initialState, action) {
  switch (action.type) {
    case TEACHER_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case TEACHER_SUCCESS:
      return {
        ...state,
        teachers: [...action.payload],
        isLoading: false,
      }
    case TEACHER_ADD_SUCCESS:
      return {
        ...state,
        success: true,
        teachers: [...state.teachers, action.payload],
        isLoading: false,
      }
    case TEACHER_DELETE_SUCCESS:
      return {
        ...state,
        success: false,
        isLoading: false,
        teachers: state.teachers.filter(
          (teacher) => teacher._id !== action.payload
        ),
      }
    case TEACHER_ERROR:
      return {
        ...state,
        success: false,
        isLoading: false,
        teachers: [...state.teachers],
      }
    case DELETE_SUCCESS:
      return {
        ...state,
        success: false,
      }
    case TEACHER_EDIT_SUCCESS:
      return {
        ...state,
        success: false,
        teachers: [...state.teachers, action.payload],
        isLoading: false,
      }
    case TEACHER_LENDING_TWO_SUCCESS:
      return {
        ...state,
        success: false,
        isLoading: false,
      }
    case TEACHER_BORROWERS_LIST:
      return {
        ...state,
        borrowers: [...action.payload],
        isLoading: false,
      }
    case TEACHER_BORROWEDBOOKS_LIST:
      return {
        ...state,
        borrowedBooks: [...action.payload],
        isLoading: false,
      }
    case TEACHER_RECORDS_LIST:
      return {
        ...state,
        records: [...action.payload],
        isLoading: false,
      }
    case TEACHER_RETURN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: false,
      }
    case TEACHER_DELETE_BORROWER:
      return {
        ...state,
        isLoading: false,
        success: false,
      }
    case TEACHER_LIST_SEARCH:
      return {
        ...state,
        teachers: state.teachers.filter((teacher) =>
          action.payload
            ? teacher.firstName.toLowerCase().indexOf(action.payload) > -1 ||
              teacher.lastName.toLowerCase().indexOf(action.payload) > -1 ||
              teacher.phone.toLowerCase().indexOf(action.payload) > -1 ||
              teacher.gender.toLowerCase().indexOf(action.payload) > -1
            : teacher
        ),
      }
    case TEACHER_BORROWERS_SEARCH:
      return {
        ...state,
        borrowers: state.borrowers.filter((borrower) =>
          action.payload
            ? borrower.firstName.toLowerCase().indexOf(action.payload) > -1 ||
              borrower.lastName.toLowerCase().indexOf(action.payload) > -1 ||
              borrower.phone.toLowerCase().indexOf(action.payload) > -1 ||
              borrower.numOfBooks
                .toString()
                .toLowerCase()
                .indexOf(action.payload) > -1 ||
              borrower.bookType.toLowerCase().indexOf(action.payload) > -1 ||
              borrower.bookName.toLowerCase().indexOf(action.payload) > -1
            : borrower
        ),
      }
    case TEACHER_BORROWEDBOOKS_SEARCH:
      return {
        ...state,
        borrowedBooks: state.borrowedBooks.filter((book) =>
          action.payload
            ? book.numOfBooks.toString().toLowerCase().indexOf(action.payload) >
                -1 ||
              book.bookType.toLowerCase().indexOf(action.payload) > -1 ||
              book.bookName.toLowerCase().indexOf(action.payload) > -1
            : book
        ),
      }
    case TEACHER_RECORDS_SEARCH:
      return {
        ...state,
        records: state.records.filter((teacher) =>
          action.payload
            ? teacher.firstName.toLowerCase().indexOf(action.payload) > -1 ||
              teacher.lastName.toLowerCase().indexOf(action.payload) > -1 ||
              teacher.phone.toLowerCase().indexOf(action.payload) > -1 ||
              teacher.gender.toLowerCase().indexOf(action.payload) > -1 ||
              teacher.numOfBooks
                .toString()
                .toLowerCase()
                .indexOf(action.payload) > -1 ||
              teacher.bookType.toLowerCase().indexOf(action.payload) > -1 ||
              teacher.bookName.toLowerCase().indexOf(action.payload) > -1
            : teacher
        ),
      }
    case DELETE_ALL_TEACHERS:
      return {
        ...state,
        teachers: [],
        records: [],
        borrowers: [],
        borrowedBooks: [],
      }
    case DELETE_ALL_TEACHER_BORROWERS:
      return {
        ...state,
        borrowers: [],
        borrowedBooks: [],
      }
    case DELETE_ALL_TEACHER_RECORDS:
      return {
        ...state,
        records: [],
      }
    default:
      return state
  }
}

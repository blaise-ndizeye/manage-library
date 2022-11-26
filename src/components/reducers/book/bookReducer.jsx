import {
  BOOK_SUCCESS,
  BOOK_LOADING,
  BOOK_ADD_SUCCESS,
  DELETE_ALL_BOOKS,
  BOOK_DELETE_SUCCESS,
  BOOK_ERROR,
  DELETE_SUCCESS,
  BOOK_EDIT_SUCCESS,
  BOOKS_SEARCH,
} from "../../actions/actionTypes"

let initialState = {
  success: false,
  books: [],
  isLoading: false,
}

export default function bookReducer(state = initialState, action) {
  switch (action.type) {
    case BOOK_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case BOOK_SUCCESS:
      return {
        ...state,
        books: [...action.payload],
        isLoading: false,
      }
    case BOOK_ADD_SUCCESS:
      return {
        ...state,
        success: true,
        books: [...state.books, action.payload],
        isLoading: false,
      }
    case BOOK_DELETE_SUCCESS:
      return {
        ...state,
        success: false,
        isLoading: false,
        books: state.books.filter((book) => book._id !== action.payload),
      }
    case BOOK_ERROR:
      return {
        ...state,
        success: false,
        isLoading: false,
        books: [...state.books],
      }
    case DELETE_SUCCESS:
      return {
        ...state,
        success: false,
      }
    case BOOK_EDIT_SUCCESS:
      return {
        ...state,
        success: false,
        books: [...state.books, action.payload],
        isLoading: false,
      }
    case BOOKS_SEARCH:
      return {
        ...state,
        books: state.books.filter((book) =>
          action.payload
            ? book.numOfBooks.toString().toLowerCase().indexOf(action.payload) >
                -1 ||
              book.typeOfBooks.toLowerCase().indexOf(action.payload) > -1
            : book
        ),
      }
    case DELETE_ALL_BOOKS:
      return {
        ...state,
        books: [],
      }
    default:
      return state
  }
}

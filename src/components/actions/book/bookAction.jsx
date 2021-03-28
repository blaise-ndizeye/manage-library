import axios from 'axios'
import {
    BOOK_LOADING, BOOK_SUCCESS, BOOK_ADD_SUCCESS, BOOK_DELETE_SUCCESS, DELETE_SUCCESS,
    BOOK_ERROR,
    BOOK_EDIT_SUCCESS,
    BOOKS_SEARCH,
    DELETE_ALL_BOOKS
} from '../actionTypes'
//import { returnErrors } from '../errorAction'
import { tokenConfig } from '../auth/authActions'
import rootURL from '../rootURL'
import NetworkHandler from '../../networkHandler'

export const deleteSuccess = () => ({
    type: DELETE_SUCCESS
})

export const searchBook = data => ({
    type: BOOKS_SEARCH,
    payload: data
})

export const bookLoading = () => ({
    type: BOOK_LOADING
})
export const bookError = () => ({
    type: BOOK_ERROR
})

export const bookList = (data) => {
    return {
        type: BOOK_SUCCESS,
        payload: data
    }
}

export const bookAddSuccess = data => ({
    type: BOOK_ADD_SUCCESS,
    payload: data
})

export const bookDeleteSuccess = bookId => ({
    type: BOOK_DELETE_SUCCESS,
    payload: bookId
})

export const bookUpdateSuccess = data => ({
    type: BOOK_EDIT_SUCCESS,
    payload: data
})

export const bookSuccess = userId => async (dispatch) => {
    try {
        const response = await axios.get(`${rootURL}/api/book/${userId}`)
        await dispatch(bookList(response.data))

    } catch (err) {
        NetworkHandler(err)
        //dispatch(returnErrors(err.response.data, err.response.status))
        dispatch(bookError())
    }
}

export const addBook = ({ userId, numOfBooks, typeOfBooks }) => async (dispatch, getState) => {
    try {
        const body = JSON.stringify({ numOfBooks, typeOfBooks })
        const response = await axios.post(`${rootURL}/api/book/${userId}`, body, tokenConfig(getState))
        await dispatch(bookLoading())
        await dispatch(bookAddSuccess(response.data))
    } catch (err) {
        NetworkHandler(err, 'ADD_BOOK_FAIL')
        //dispatch(returnErrors(err.response.data, err.response.status, 'ADD_BOOK_FAIL'))
        dispatch(bookError())
    }
}

export const deleteBook = ({ userId, bookId }) => async (dispatch, getState) => {
    try {
        await dispatch(bookLoading())
        const response = await axios.delete(`${rootURL}/api/book/${userId}/${bookId}`, tokenConfig(getState))
        response.data.success ? await dispatch(bookDeleteSuccess(bookId)) : dispatch(bookError())
    } catch (err) {
        NetworkHandler(err)
        //dispatch(returnErrors(err.response.data, err.response.status))
        dispatch(bookError())
    }

}

export const editBook = ({ userId, bookId, numOfBooks, typeOfBooks }) => async (dispatch, getState) => {
    try {
        const body = JSON.stringify({ numOfBooks, typeOfBooks })
        const response = await axios.patch(`${rootURL}/api/book/${userId}/${bookId}`, body, tokenConfig(getState))
        await dispatch(bookLoading())
        await dispatch(bookDeleteSuccess(bookId))
        await dispatch(bookUpdateSuccess(response.data))
    } catch (err) {
        NetworkHandler(err, 'EDIT_BOOK_FAIL')
        //dispatch(returnErrors(err.response.data, err.response.status, 'EDIT_BOOK_FAIL'))
        dispatch(bookError())
    }
}

export const deleteAllBooks = userId => async (dispatch, getState) => {
    try {
        await axios.delete(`${rootURL}/api/bookSettings/deleteAllBooks/${userId}`, tokenConfig(getState))
        await dispatch({ type: DELETE_ALL_BOOKS })
    } catch (err) {
        NetworkHandler(err)
        //dispatch(returnErrors(err.response.data, err.response.status))
        dispatch(bookError())
    }
}
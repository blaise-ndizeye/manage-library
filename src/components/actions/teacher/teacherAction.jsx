import axios from 'axios'
import {
    TEACHER_LOADING, TEACHER_SUCCESS, TEACHER_ADD_SUCCESS, TEACHER_DELETE_SUCCESS, DELETE_SUCCESS,
    TEACHER_ERROR,
    TEACHER_EDIT_SUCCESS,
    TEACHER_BORROWERS_LIST,
    TEACHER_BORROWEDBOOKS_LIST,
    TEACHER_LENDING_TWO_SUCCESS,
    TEACHER_RETURN_SUCCESS,
    TEACHER_RECORDS_LIST,
    TEACHER_DELETE_BORROWER,
    TEACHER_LIST_SEARCH,
    TEACHER_BORROWERS_SEARCH,
    TEACHER_BORROWEDBOOKS_SEARCH,
    TEACHER_RECORDS_SEARCH,
    DELETE_ALL_TEACHERS,
    DELETE_ALL_TEACHER_BORROWERS,
    DELETE_ALL_TEACHER_RECORDS
} from '../actionTypes'
import { returnErrors } from '../errorAction'
import { tokenConfig } from '../auth/authActions'

export const deleteSuccess = () => ({
    type: DELETE_SUCCESS
})

export const teacherLoading = () => ({
    type: TEACHER_LOADING
})
export const teacherError = () => ({
    type: TEACHER_ERROR
})

export const teacherList = (data) => ({
    type: TEACHER_SUCCESS,
    payload: data
})

export const teacherAddSuccess = data => ({
    type: TEACHER_ADD_SUCCESS,
    payload: data
})

export const teacherDeleteSuccess = teacherId => ({
    type: TEACHER_DELETE_SUCCESS,
    payload: teacherId
})

export const teacherUpdateSuccess = data => ({
    type: TEACHER_EDIT_SUCCESS,
    payload: data
})

export const teacherBorrowers = data => ({
    type: TEACHER_BORROWERS_LIST,
    payload: data
})

export const teacherBorrowedBooks = data => ({
    type: TEACHER_BORROWEDBOOKS_LIST,
    payload: data
})

export const teacherLending = () => ({
    type: TEACHER_LENDING_TWO_SUCCESS
})

export const teacherReturn = () => ({
    type: TEACHER_RETURN_SUCCESS
})

export const teacherRecordSuccess = data => ({
    type: TEACHER_RECORDS_LIST,
    payload: data
})

export const deleteTeacherBorrower = () => ({
    type: TEACHER_DELETE_BORROWER
})

export const teacherListSearch = data => ({
    type: TEACHER_LIST_SEARCH,
    payload: data
})

export const teacherBorrowerSearch = data => ({
    type: TEACHER_BORROWERS_SEARCH,
    payload: data
})

export const teacherBorrowedBookSearch = data => ({
    type: TEACHER_BORROWEDBOOKS_SEARCH,
    payload: data
})

export const teacherRecordSearch = data => ({
    type: TEACHER_RECORDS_SEARCH,
    payload: data
})

export const teacherSuccess = userId => async (dispatch) => {
    try {
        const response = await axios.get(`/api/teacher/${userId}`)
        await dispatch(teacherList(response.data))

    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch(teacherError())
    }
}

export const addTeacher = ({ userId, firstName, lastName, gender, phone }) => async (dispatch, getState) => {
    try {
        const body = JSON.stringify({ firstName, lastName, phone, gender })
        const response = await axios.post(`/api/teacher/${userId}`, body, tokenConfig(getState))
        await dispatch(teacherLoading())
        await dispatch(teacherAddSuccess(response.data))
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status, 'ADD_TEACHER_FAIL'))
        dispatch(teacherError())
    }
}

export const deleteTeacher = ({ userId, teacherId }) => async (dispatch, getState) => {
    try {
        const response = await axios.delete(`/api/teacher/${userId}/${teacherId}`, tokenConfig(getState))
        await dispatch(teacherLoading())
        response.data.success ? await dispatch(teacherDeleteSuccess(teacherId)) : dispatch(teacherError())
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch(teacherError())
    }

}

export const editTeacher = ({ userId, teacherId, firstName, lastName, gender, phone }) => async (dispatch, getState) => {
    try {
        const body = JSON.stringify({ firstName, lastName, gender, phone })
        const response = await axios.patch(`/api/teacher/${userId}/${teacherId}`, body, tokenConfig(getState))
        await dispatch(teacherLoading())
        await dispatch(teacherDeleteSuccess(teacherId))
        await dispatch(teacherUpdateSuccess(response.data))
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status, 'EDIT_TEACHER_FAIL'))
        dispatch(teacherError())
    }
}

export const teacherBorrowerList = userId => async (dispatch, getState) => {
    try {
        const response = await axios.get(`/api/teacher/borrowers/${userId}`)
        await dispatch(teacherBorrowers(response.data))
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch(teacherError())
    }
}

export const teacherBorrowedBookList = userId => async (dispatch, getState) => {
    try {
        const response = await axios.get(`/api/teacher/borrowedBooks/${userId}`)
        await dispatch(teacherBorrowedBooks(response.data))
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch(teacherError())
    }
}

export const lendTeacher = ({ userId, teacherId, numOfBooks, bookType, bookName }) => async (dispatch, getState) => {
    try {
        const body = JSON.stringify({ bookType, numOfBooks, bookName })
        await axios.post(`/api/teacher/lend/${userId}/${teacherId}`, body, tokenConfig(getState))
        await dispatch(teacherLoading())
        await dispatch(teacherLending())
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status, 'LEND_TEACHER_FAIL'))
        dispatch(teacherError())
    }
}
export const teacherRecords = userId => async (dispatch, getState) => {
    try {
        const response = await axios.post(`/api/teacher/record/${userId}`)
        await dispatch(teacherRecordSuccess(response.data))
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch(teacherError())
    }
}

export const deleteBorrowers = ({ userId, teacherId, bookType, bookName }) => async (dispatch, getState) => {
    try {
        const body = JSON.stringify({ bookType, bookName })
        await axios.post(`/api/teacher/borrower/${userId}/${teacherId}`, body, tokenConfig(getState))
        await dispatch(teacherLoading())
        await dispatch(deleteTeacherBorrower())
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status, 'TEACHER_DELETE_BORROWER_FAIL'))
        dispatch(teacherError())
    }
}

export const teacherReturnSuccess = ({ userId, teacherId, bookType, bookName, numOfBooks }) => async (dispatch, getState) => {
    try {
        const body = JSON.stringify({ bookName, bookType, numOfBooks })
        await axios.post(`/api/teacher/record/${userId}/${teacherId}`, body, tokenConfig(getState))
        await dispatch(teacherLoading())
        await dispatch(teacherReturn())
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status, 'RETURN_TEACHER_FAIL'))
        dispatch(teacherError())
    }
}

export const deleteAllTeachers = userId => async (dispatch, getState) => {
    try {
        await axios.delete(`/api/teacherSettings/deleteAllTeachers/${userId}`, tokenConfig(getState))
        await dispatch({ type: DELETE_ALL_TEACHERS })
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch(teacherError())
    }
}

export const deleteAllBorrowers = userId => async (dispatch, getState) => {
    try {
        await axios.delete(`/api/teacherSettings/deleteAllBorrowers/${userId}`, tokenConfig(getState))
        await dispatch({ type: DELETE_ALL_TEACHER_BORROWERS })
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch(teacherError())
    }
}

export const deleteAllRecords = userId => async (dispatch, getState) => {
    try {
        await axios.delete(`/api/teacherSettings/deleteAllRecords/${userId}`, tokenConfig(getState))
        await dispatch({ type: DELETE_ALL_TEACHER_RECORDS })
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch(teacherError())
    }
}


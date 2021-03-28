import axios from 'axios'
import {
    STUDENT_LOADING, STUDENT_SUCCESS, STUDENT_ADD_SUCCESS, STUDENT_DELETE_SUCCESS, DELETE_SUCCESS,
    STUDENT_ERROR,
    STUDENT_EDIT_SUCCESS,
    STUDENT_LENDING_TWO_SUCCESS,
    STUDENT_BORROWERS_LIST,
    STUDENT_BORROWEDBOOKS_LIST,
    STUDENT_RETURN_SUCCESS,
    STUDENT_RECORDS_LIST,
    STUDENT_DELETE_BORROWER,
    STUDENT_LIST_SEARCH,
    STUDENT_BORROWERS_SEARCH,
    STUDENT_BORROWEDBOOKS_SEARCH,
    STUDENT_RECORDS_SEARCH,
    DELETE_ALL_STUDENTS,
    DELETE_ALL_STUDENT_BORROWERS,
    DELETE_ALL_STUDENT_RECORDS,
    RETURN_FOR_FINALIST,
    FINALIST_LIST,
    PROMOTE_STUDENTS,
    DELETE_ALL_FINALISTS,
    FINALISTS_SEARCH,
    DELETE_FINALIST
} from '../actionTypes'
import { returnErrors } from '../errorAction'
import { tokenConfig } from '../auth/authActions'
import rootURL from '../rootURL'
import NetworkHandler from '../../networkHandler'

export const deleteSuccess = () => ({
    type: DELETE_SUCCESS
})

export const studentLoading = () => ({
    type: STUDENT_LOADING
})
export const studentError = () => ({
    type: STUDENT_ERROR
})

export const studentList = (data) => ({
    type: STUDENT_SUCCESS,
    payload: data

})

export const studentListSearch = data => ({
    type: STUDENT_LIST_SEARCH,
    payload: data
})

export const studentBorrowerSearch = data => ({
    type: STUDENT_BORROWERS_SEARCH,
    payload: data
})

export const studentBorrowedBookSearch = data => ({
    type: STUDENT_BORROWEDBOOKS_SEARCH,
    payload: data
})

export const studentRecordSearch = data => ({
    type: STUDENT_RECORDS_SEARCH,
    payload: data
})

export const studentLending = (data) => ({
    type: STUDENT_LENDING_TWO_SUCCESS,
    payload: data
})

export const studentAddSuccess = data => ({
    type: STUDENT_ADD_SUCCESS,
    payload: data
})

export const studentDeleteSuccess = studentId => ({
    type: STUDENT_DELETE_SUCCESS,
    payload: studentId
})

export const studentUpdateSuccess = data => ({
    type: STUDENT_EDIT_SUCCESS,
    payload: data
})

export const studentBorrowers = data => ({
    type: STUDENT_BORROWERS_LIST,
    payload: data
})

export const studentBorrowedBooks = data => ({
    type: STUDENT_BORROWEDBOOKS_LIST,
    payload: data
})

export const studentReturn = (data) => ({
    type: STUDENT_RETURN_SUCCESS,
    payload: data
})

export const studentRecordList = data => ({
    type: STUDENT_RECORDS_LIST,
    payload: data
})

export const deleteStudentBorrower = () => ({
    type: STUDENT_DELETE_BORROWER
})

export const studentSuccess = userId => async (dispatch) => {
    try {
        const response = await axios.get(`${rootURL}/api/student/${userId}`)
        await dispatch(studentList(response.data))

    } catch (err) {
        NetworkHandler(err)
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch(studentError())
    }
}


export const addStudent = ({ userId, firstName, lastName, Class, gender, age }) => async (dispatch, getState) => {
    try {
        const body = JSON.stringify({ firstName, lastName, Class, gender, age })
        const response = await axios.post(`${rootURL}/api/student/${userId}`, body, tokenConfig(getState))
        await dispatch(studentLoading())
        await dispatch(studentAddSuccess(response.data))
    } catch (err) {
        NetworkHandler(err)
        dispatch(returnErrors(err.response.data, err.response.status, 'ADD_STUDENT_FAIL'))
        dispatch(studentError())
    }
}

export const deleteStudent = ({ userId, studentId }) => async (dispatch, getState) => {
    try {
        const response = await axios.delete(`${rootURL}/api/student/${userId}/${studentId}`, tokenConfig(getState))
        await dispatch(studentLoading())
        response.data.success ? await dispatch(studentDeleteSuccess(studentId)) : dispatch(studentError())
    } catch (err) {
        NetworkHandler(err)
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch(studentError())
    }

}

export const editStudent = ({ userId, studentId, firstName, lastName, Class, gender, age }) => async (dispatch, getState) => {
    try {
        const body = JSON.stringify({ firstName, lastName, Class, gender, age })
        const response = await axios.patch(`${rootURL}/api/student/${userId}/${studentId}`, body, tokenConfig(getState))
        await dispatch(studentLoading())
        await dispatch(studentDeleteSuccess(studentId))
        await dispatch(studentUpdateSuccess(response.data))
    } catch (err) {
        NetworkHandler(err)
        dispatch(returnErrors(err.response.data, err.response.status, 'EDIT_STUDENT_FAIL'))
        dispatch(studentError())
    }
}

export const lendStudent = ({ userId, borrowerId, bookType, bookName, bookId, $bookId, $bookType, $bookName }) => async (dispatch, getState) => {
    try {
        const body = JSON.stringify({ bookId, bookType, bookName, $bookId, $bookName, $bookType })
        const response = await axios.post(`${rootURL}/api/student/lend/${userId}/${borrowerId}`, body, tokenConfig(getState))
        await dispatch(studentLoading())
        await dispatch(studentLending(response.data))
    } catch (err) {
        NetworkHandler(err)
        dispatch(returnErrors(err.response.data, err.response.status, 'LEND_STUDENT_FAIL'))
        dispatch(studentError())
    }
}

export const studentBorrowerList = userId => async (dispatch, getState) => {
    try {
        const response = await axios.get(`${rootURL}/api/student/borrower/${userId}`)
        await dispatch(studentBorrowers(response.data))
    } catch (err) {
        NetworkHandler(err)
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch(studentError())
    }
}

export const studentBorrowedBookList = userId => async (dispatch, getState) => {
    try {
        const response = await axios.get(`${rootURL}/api/student/borrowedBook/${userId}`)
        await dispatch(studentBorrowedBooks(response.data))
    } catch (err) {
        NetworkHandler(err)
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch(studentError())
    }
}

export const studentReturnSuccess = ({ userId, studentId, bookType, bookId, bookName }) => async (dispatch, getState) => {
    try {
        const body = JSON.stringify({ bookId, bookType, bookName })
        const response = await axios.post(`${rootURL}/api/student/record/${userId}/${studentId}`, body, tokenConfig(getState))
        await dispatch(studentLoading())
        await dispatch(studentReturn(response.data))
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status, 'STUDENT_RETURN_FAIL'))
        dispatch(studentError())
    }
}


export const deleteBorrowers = ({ userId, studentId, bookId, bookName, bookType }) => async (dispatch, getState) => {
    try {
        const body = JSON.stringify({ bookId, bookType, bookName })
        await axios.post(`${rootURL}/api/student/borrower/${userId}/${studentId}`, body, tokenConfig(getState))
        await dispatch(deleteStudentBorrower())
    } catch (err) {
        NetworkHandler(err)
        dispatch(returnErrors(err.response.data, err.response.status, 'STUDENT_DELETE_BORROWER_FAIL'))
        dispatch(studentError())
    }
}

export const studentRecords = userId => async (dispatch, getState) => {
    try {
        const response = await axios.post(`${rootURL}/api/student/record/${userId}`)
        await dispatch(studentRecordList(response.data))
    } catch (err) {
        NetworkHandler(err)
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch(studentError())
    }
}

export const deleteAllStudents = userId => async (dispatch, getState) => {
    try {
        await axios.delete(`${rootURL}/api/studentSettings/deleteAllStudents/${userId}`, tokenConfig(getState))
        await dispatch({ type: DELETE_ALL_STUDENTS })
    } catch (err) {
        NetworkHandler(err)
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch(studentError())
    }
}

export const deleteAllBorrowers = userId => async (dispatch, getState) => {
    try {
        const response = await axios.delete(`${rootURL}/api/studentSettings/deleteAllBorrowers/${userId}`, tokenConfig(getState))
        console.log(response)
        await dispatch({ type: DELETE_ALL_STUDENT_BORROWERS })
    } catch (err) {
        NetworkHandler(err)
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch(studentError())
    }
}

export const deleteAllRecords = userId => async (dispatch, getState) => {
    try {
        await axios.delete(`${rootURL}/api/studentSettings/deleteAllRecords/${userId}`, tokenConfig(getState))
        await dispatch({ type: DELETE_ALL_STUDENT_RECORDS })
    } catch (err) {
        NetworkHandler(err)
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch(studentError())
    }
}

export const promoteStudents = userId => async (dispatch, getState) => {
    try {
        await axios.post(`${rootURL}/api/studentSettings/promoteStudents/${userId}`, {}, tokenConfig(getState))
        await dispatch({ type: PROMOTE_STUDENTS })
    } catch (err) {
        NetworkHandler(err)
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch(studentError())
    }
}

export const returnForFinalists = ({ userId, studentId }) => async (dispatch, getState) => {
    try {
        await axios.post(`${rootURL}/api/studentSettings/returnForFinalist/${userId}/${studentId}`, {}, tokenConfig(getState))
        await dispatch(studentLoading())
        await dispatch({ type: RETURN_FOR_FINALIST })
    } catch (err) {
        NetworkHandler(err)
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch(studentError())
    }
}

export const finalistList = userId => async (dispatch, getState) => {
    try {
        const response = await axios.get(`${rootURL}/api/studentSettings/allFinalists/${userId}`)
        await dispatch({
            type: FINALIST_LIST,
            payload: response.data
        })
    } catch (err) {
        NetworkHandler(err)
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch(studentError())
    }
}

export const deleteAllFinalists = userId => async (dispatch, getState) => {
    try {
        await axios.get(`${rootURL}/api/studentSettings/deleteAllFinalists/${userId}`, tokenConfig(getState))
        await dispatch({ type: DELETE_ALL_FINALISTS })
    } catch (err) {
        NetworkHandler(err)
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch(studentError())
    }
}

export const deleteFinalist = ({ userId, studentId }) => async (dispatch, getState) => {
    try {
        await axios.delete(`${rootURL}/api/studentSettings/deleteFinalist/${userId}/${studentId}`, tokenConfig(getState))
        await dispatch(studentLoading())
        await dispatch({ type: DELETE_FINALIST })
    } catch (err) {
        NetworkHandler(err)
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch(studentError())
    }
}

export const finalistsSearch = data => ({
    type: FINALISTS_SEARCH,
    payload: data
})
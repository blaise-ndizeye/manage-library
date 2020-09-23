import axios from 'axios'
import {
    AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL,
    LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADING, USER_LOADED, CHECK_PASSWORD_FAIL, CHECK_PASSWORD, CHANGE_PASSWORD_FAIL,
    CHANGE_PASSWORD,
    CHANGE_EMAILORUSERNAME_FAIL,
    CHANGE_EMAILORUSERNAME,
    CLEAR_CONFIRMATION,
    DELETE_ACCOUNT,
    DELETE_ACCOUNT_FAIL
} from '../actionTypes'
import { returnErrors } from '../errorAction'

//check token and load user
export const loadUser = () => async (dispatch, getState) => {
    try {
        //user loading
        await dispatch({ type: USER_LOADING })

        const response = await axios.get('/api/user', tokenConfig(getState))

        await dispatch({ type: USER_LOADED, payload: response.data })
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch({ type: AUTH_ERROR })
    }
}
//register

export const register = ({ name, email, password, password1 }) => async (dispatch) => {

    try {
        //headers
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }

        const body = JSON.stringify({ name, email, password, password1 })

        await axios.post('/api/user/register', body, config)

        await dispatch({
            type: REGISTER_SUCCESS,
            payload: 'Successfully registered!! you can login now!!'
        })
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

//setup config/headers/token

export const tokenConfig = (getState) => {
    //get token from localStorage
    const token = getState().auth.token
    //headers
    const config = {
        headers: {
            "content-type": "application/json"
        }
    }
    //headers
    if (token) {
        config.headers['auth-token'] = token
    }
    return config
}

export const login = ({ email, password }) => async (dispatch) => {

    try {
        //headers
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        const body = JSON.stringify({ email, password })
        const response = await axios.post('/api/user/login', body, config)

        await dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        })
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

//logout
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}
export const clearConfirmation = () => ({
    type: CLEAR_CONFIRMATION
})

export const checkPassword = ({ userId, email, password }) => async (dispatch, getState) => {
    try {
        const body = JSON.stringify({ email, password })
        await axios.post(`/api/user/checkPassword/${userId}`, body, tokenConfig(getState))
        await dispatch({ type: CHECK_PASSWORD })
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status, 'CHECK_PASSWORD_FAIL'))
        dispatch({ type: CHECK_PASSWORD_FAIL })
    }
}

export const changePassword = ({ userId, password }) => async (dispatch, getState) => {
    try {
        const body = JSON.stringify({ password })
        const response = await axios.patch(`/api/user/changePassword/${userId}`, body, tokenConfig(getState))
        await dispatch({
            type: CHANGE_PASSWORD,
            payload: response.data
        })
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status, 'CHANGE_PASSWORD_FAIL'))
        dispatch({ type: CHANGE_PASSWORD_FAIL })
    }
}

export const changeEmailOrUsername = ({ userId, username, email }) => async (dispatch, getState) => {
    try {
        const body = JSON.stringify({ username, email })
        const response = await axios.patch(`/api/user/changeEmailOrUsername/${userId}`, body, tokenConfig(getState))
        await dispatch({
            type: CHANGE_EMAILORUSERNAME,
            payload: response.data
        })
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status, 'CHANGE_EMAILORUSERNAME_FAIL'))
        dispatch({ type: CHANGE_EMAILORUSERNAME_FAIL })
    }
}

export const deleteAccount = userId => async (dispatch, getState) => {
    try {
        await axios.delete(`/api/user/deleteAccount/${userId}`, tokenConfig(getState))
        await dispatch({ type: DELETE_ACCOUNT })
        await dispatch(logout())
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch({ type: DELETE_ACCOUNT_FAIL })
    }
}

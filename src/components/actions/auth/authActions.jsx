import axios from 'axios'
import networkHandler from '../../networkHandler'
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
//import { returnErrors } from '../errorAction'
import rootURL from '../rootURL'

//check token and load user
export const loadUser = () => async (dispatch, getState) => {
    try {
        //user loading
        await dispatch({ type: USER_LOADING })

        const response = await axios.get(`${rootURL}/api/user`, tokenConfig(getState))

        await dispatch({ type: USER_LOADED, payload: response.data })
    } catch (err) {
        networkHandler(err)
        // dispatch(returnErrors(err.response.data, err.response.status))
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

        await axios.post(`${rootURL}/api/user/register`, body, config)

        await dispatch({
            type: REGISTER_SUCCESS,
            payload: 'Successfully registered!! you can login now!!'
        })
    } catch (err) {
        networkHandler(err, 'REGISTER_FAIL')
        //dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
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
        const response = await axios.post(`${rootURL}/api/user/login`, body, config)

        await dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        })
    } catch (err) {
        networkHandler(err, 'LOGIN_FAIL')
        //dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
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
        await axios.post(`${rootURL}/api/user/checkPassword/${userId}`, body, tokenConfig(getState))
        await dispatch({ type: CHECK_PASSWORD })
    } catch (err) {
        networkHandler(err, 'CHECK_PASSWORD_FAIL')
        //dispatch(returnErrors(err.response.data, err.response.status, 'CHECK_PASSWORD_FAIL'))
        dispatch({ type: CHECK_PASSWORD_FAIL })
    }
}

export const changePassword = ({ userId, password }) => async (dispatch, getState) => {
    try {
        const body = JSON.stringify({ password })
        const response = await axios.patch(`${rootURL}/api/user/changePassword/${userId}`, body, tokenConfig(getState))
        await dispatch({
            type: CHANGE_PASSWORD,
            payload: response.data
        })
    } catch (err) {
        networkHandler(err, 'CHANGE_PASSWORD_FAIL')
        //dispatch(returnErrors(err.response.data, err.response.status, 'CHANGE_PASSWORD_FAIL'))
        dispatch({ type: CHANGE_PASSWORD_FAIL })
    }
}

export const changeEmailOrUsername = ({ userId, username, email }) => async (dispatch, getState) => {
    try {
        const body = JSON.stringify({ username, email })
        const response = await axios.patch(`${rootURL}/api/user/changeEmailOrUsername/${userId}`, body, tokenConfig(getState))
        await dispatch({
            type: CHANGE_EMAILORUSERNAME,
            payload: response.data
        })
    } catch (err) {
        networkHandler(err, 'CHANGE_EMAILORUSERNAME_FAIL')
        //dispatch(returnErrors(err.response.data, err.response.status, 'CHANGE_EMAILORUSERNAME_FAIL'))
        dispatch({ type: CHANGE_EMAILORUSERNAME_FAIL })
    }
}

export const deleteAccount = userId => async (dispatch, getState) => {
    try {
        await axios.delete(`${rootURL}/api/user/deleteAccount/${userId}`, tokenConfig(getState))
        await dispatch({ type: DELETE_ACCOUNT })
        await dispatch(logout())
    } catch (err) {
        networkHandler(err)
        //dispatch(returnErrors(err.response.data, err.response.status))
        dispatch({ type: DELETE_ACCOUNT_FAIL })
    }
}

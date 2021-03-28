import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    CLEAR_SUCCESS,
    CHECK_PASSWORD,
    DELETE_ACCOUNT,
    CHANGE_PASSWORD,
    CHANGE_EMAILORUSERNAME,
    CHECK_PASSWORD_FAIL,
    CHANGE_PASSWORD_FAIL,
    CHANGE_EMAILORUSERNAME_FAIL,
    CLEAR_CONFIRMATION,
    DELETE_ACCOUNT_FAIL,
    NETWORK_ERROR,
    NETWORK_SUCCESS
} from '../../actions/actionTypes'

const initialState = {
    token: localStorage.getItem('token'),
    isAunthenticated: null,
    isLoading: false,
    user: {},
    success: null,
    checkPassword: false,
    userMsg: null,
    networkError: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true,
                userMsg: null
            }
        case USER_LOADED:
            return {
                ...state,
                isAunthenticated: true,
                isLoading: false,
                user: action.payload,
                success: null,
                checkPassword: false,
                userMsg: null
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAunthenticated: true,
                isLoading: false,
                success: null,
                checkPassword: false,
                userMsg: null
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
        case DELETE_ACCOUNT:
            localStorage.removeItem('token')
            localStorage.clear()
            return {
                ...state,
                token: null,
                user: {},
                isAunthenticated: false,
                isLoading: false,
                success: null,
                checkPassword: false,
                userMsg: null
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAunthenticated: false,
                isLoading: false,
                user: {},
                success: action.payload,
                checkPassword: false,
                userMsg: 'You have successfully created account you can login!!'
            }
        case DELETE_ACCOUNT_FAIL:
            return { ...state }
        case CLEAR_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                isLoading: false,
                user: {},
                success: null
            }
        case CHECK_PASSWORD_FAIL:
            return {
                ...state,
                isLoading: false,
                success: null,
                checkPassword: false
            }
        case CHECK_PASSWORD:
            return {
                ...state,
                isLoading: false,
                checkPassword: true,
                success: true
            }
        case CHANGE_PASSWORD:
        case CHANGE_EMAILORUSERNAME:
            return {
                ...state,
                isLoading: false,
                success: true,
                user: { ...action.payload }
            }
        case CHANGE_PASSWORD_FAIL:
        case CHANGE_EMAILORUSERNAME_FAIL:
            return {
                ...state,
                isLoading: false,
                success: false
            }
        case CLEAR_CONFIRMATION:
            return {
                ...state,
                checkPassword: false,
                success: false
            }
        case NETWORK_ERROR:
            return {
                ...state,
                networkError: true
            }
        case NETWORK_SUCCESS:
            return {
                ...state,
                networkError: false
            }
        default:
            return state
    }
}
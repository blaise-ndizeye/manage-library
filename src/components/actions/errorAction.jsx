import { GET_ERRORS, CLEAR_ERRORRS, CLEAR_SUCCESS } from './actionTypes'

//Return errors

export const returnErrors = (msg, status, id = null) => {
    return {
        type: GET_ERRORS,
        payload: {
            msg, status, id
        }
    }
}

//clear errors

export const clearErrors = () => ({
    type: CLEAR_ERRORRS
})

export const clearSuccess = () => ({
    type: CLEAR_SUCCESS
})
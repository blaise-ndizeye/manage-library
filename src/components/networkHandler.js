//import { useDispatch } from 'react-redux'
import store from '../store'
import { returnErrors } from './actions/errorAction'

import { NETWORK_ERROR, NETWORK_SUCCESS } from './actions/actionTypes'

export default function NetworkHandler(e, errId) {
    //const dispatch = useDispatch()
    //console.log(e.message === 'Network Error')
    if (e.message === 'Network Error') {
        return store.dispatch({ type: NETWORK_ERROR })
    } else {
        errId ? store.dispatch(returnErrors(e.response.data, e.response.status, errId)) : store.dispatch(returnErrors(e.response.data, e.response.status))
        return store.dispatch({ type: NETWORK_SUCCESS })
    }
}
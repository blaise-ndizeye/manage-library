import { useDispatch } from 'react-redux'
import { NETWORK_ERROR, NETWORK_SUCCESS } from './actions/actionTypes'

export default function NetworkHandler(e) {
    const dispatch = useDispatch()
    if (e === 'Network Error') {
        return dispatch({ type: NETWORK_ERROR })
    } else {
        return dispatch({ type: NETWORK_SUCCESS })
    }
}
import React from 'react'
import { connect } from 'react-redux'
import Guest from './UnAuthPages/guestpage'
import Home from './AuthPages/Home'
import Loader from '../pageEffect/loader'

const GuestPage = (props) => {
    const { isAunthenticated, isLoading } = props
    if (isLoading) {
        return <Loader />
    }
    else if (!isAunthenticated) {
        return ( 
           <Guest /> 
     )
    } 
    else {
        return (
            <Home />
        )
    }
    
}
const mapStateToProps = state => ({
    isAunthenticated: state.auth.isAunthenticated,
    isLoading: state.auth.isLoading
})
 
export default connect(mapStateToProps)(GuestPage);
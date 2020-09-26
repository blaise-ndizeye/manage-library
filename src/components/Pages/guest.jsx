import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Guest from './UnAuthPages/guestpage'
import Loader from '../pageEffect/loader'

const GuestPage = (props) => {
    const { isAunthenticated, isLoading } = props

    useEffect(() => {
        if (isAunthenticated) {
            props.history.push('/home')
        }
    }, [isAunthenticated, props.history])

    if (isLoading) {
        return <Loader />
    }
    return (
        <Guest />
    )

}
const mapStateToProps = state => ({
    isAunthenticated: state.auth.isAunthenticated,
    isLoading: state.auth.isLoading
})

export default connect(mapStateToProps)(GuestPage);
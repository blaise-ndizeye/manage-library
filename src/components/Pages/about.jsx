import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Loader from '../pageEffect/loader'
import { AboutCard } from './UnAuthPages/aboutCard'
import HelpCard from './UnAuthPages/heplCard'

const About = (props) => {
    const { isAunthenticated, isLoading } = props
    if (isLoading) {
        return <Loader />
    }
    else if (!isAunthenticated) {
        return <>
            <div className="container">
                <AboutCard />
            </div>
            <HelpCard />
        </>
    }
    else {
        return <Redirect to="/home" />
    }

}
const mapStateToProps = state => ({
    isAunthenticated: state.auth.isAunthenticated,
    isLoading: state.auth.isLoading
})

export default connect(mapStateToProps)(About);
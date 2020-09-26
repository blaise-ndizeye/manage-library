import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Cards from './UnAuthPages/Cards'
import Loader from '../pageEffect/loader'
import { AboutCard } from './UnAuthPages/aboutCard'

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
            <Cards />
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
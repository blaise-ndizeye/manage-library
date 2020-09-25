import React from 'react'
import './guestpage.css'
import Cards from './Cards'

const GuestPage = () => {

    return <div className="row cont">
        <div className="bg4 col-md-12 col-sm-12">
        </div>
        <div className="bg4 col-md-12 col-sm-12">
        </div>
        <div className="bg4 col-md-12 col-sm-12">
            <h2 style={{ marginBottom: '38px', marginTop: '35px' }}>Welcome to Online Library Management System</h2>
            <Cards />
        </div>
    </div>
}

export default GuestPage;
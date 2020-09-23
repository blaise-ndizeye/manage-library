import React from 'react'
import './guestpage.css'
import Cards from './Cards'

const GuestPage = () => {

    return <div className="cont row">
        <div className="bg4 col-md-12 col-sm-12">
            <h2>Welcome to Online Library Management System</h2>
            <Cards />
        </div>
    </div>
}

export default GuestPage;
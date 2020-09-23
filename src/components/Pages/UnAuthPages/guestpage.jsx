import React from 'react'
import { Jumbotron } from 'reactstrap'
import './guestpage.css'

const GuestPage = () => {
    const style = {
        marginTop: '55px',
        color: 'aliceblue'
    }
    return <div>
        <Jumbotron className="col-md-12 col-sm-12 jumbotron-image shadow">
            <div className="contaner">
                <h1 style={style} className="display-5">WELCOME TO ONLINE LIBRARY MANAGEMENT SYSTEM</h1>
                <p style={{ color: 'white' }} className="lead">This library is created to manage the lending and return of books for students in the library</p>
            </div>
        </Jumbotron>
    </div>
}

export default GuestPage;
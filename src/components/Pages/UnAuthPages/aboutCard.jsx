import React from 'react'
import { Link } from 'react-router-dom'

export const AboutCard = () => {

    return <div className="card text-center mx-auto bg-transparent" style={{ width: '30rem' }}>
        <div className="card-body">
            <h5 className="card-title text-light">System developed by <span className="text-primary"><i>'Stack-Dev'</i></span></h5>
            <p className="card-text text-light">Once you like this app please contact us for more: <br />
                <span className="text-info">+250787657134/+250784405833</span> or <b>Support us</b>.<br />
                Click the button below to send email to us we will respond very soon. <b>Thanks!!</b>
            </p>
            <Link to="#" className="btn btn-outline-primary btn-lg">Email Us Here</Link>
        </div>
    </div>
}

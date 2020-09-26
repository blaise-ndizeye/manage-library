import React from 'react'

export const AboutCard = () => {

    return <div className="row">
        <div className="card text-center mx-auto bg-transparent col-md-6 col-sm-12" style={{ width: '30rem' }}>
            <div className="card-body">
                <h5 className="card-title text-light">System developed by <span className="text-primary"><i>'Stack-Fielders'</i></span></h5>
                <p className="card-text text-light">Once you like this app please contact us for more: <br />
                    <span className="text-info">+250787657134/+250784405833</span> or <b>Support us</b>.<br />
                You can email us by the below email. <b>Thanks!!</b>
                </p>
                <p className="card-text text-primary">stactFielders@gmail.com</p>
            </div>
        </div>
    </div>
}

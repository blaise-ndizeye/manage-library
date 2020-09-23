import React from 'react'
import CardUi from './CardUi'
import img2 from '../AuthPages/images/bg2.jpg'
import img3 from '../AuthPages/images/bg3.jpg'

const Cards = () => {
    return (
        <div className="container d-flex justify-content-center">
            <div className="row">
                <div className="col-md-4 col-sm-12">
                    <CardUi imgSrc={img2} title="Lending Books" />
                </div>
                <div className="col-md-4 col-sm-12">
                    <CardUi imgSrc={img2} title="Returning Books" />
                </div>
                <div className="col-md-4 col-sm-12">
                    <CardUi imgSrc={img3} title="Managing Books" />
                </div>
            </div>
        </div>
    );
}

export default Cards;
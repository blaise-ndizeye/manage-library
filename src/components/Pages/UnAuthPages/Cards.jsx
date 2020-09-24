import React from 'react'
import CardUi from './CardUi'
import img1 from '../AuthPages/images/bg2.png'
import img2 from '../AuthPages/images/bg4.jpeg'
import img3 from '../AuthPages/images/bg3.png'

const Cards = () => {
    return (
        <div className="container d-flex justify-content-center">
            <div className="row">
                <div className="col-md-4 col-sm-12">
                    <CardUi imgSrc={img1} title="Lending Books" />
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
import React from 'react'
import CardUi from './CardUi'
import img1 from '../AuthPages/images/bg1.jpg'
import img2 from '../AuthPages/images/bg2.jpg'
import img3 from '../AuthPages/images/bg3.jpg'

const Cards = () => {
    return ( 
        <div className="container-fluid d-flex justify-content-center">
            <div className="row">
                <div className="col-md-4 col-lg-4 col-sm-4">
                    <CardUi imgSrc = { img1 } title = "Library"/>
                </div>
                <div className="col-md-4 col-lg-4 col-sm-4">
                <CardUi imgSrc = { img2 } title = "crater lake"/>
                </div>
                <div className="col-md-4 col-lg-4 col-sm-4">
                <CardUi imgSrc = { img3 } title = "best house library" />
                </div>
            </div>
        </div>
     );
}
 
export default Cards;
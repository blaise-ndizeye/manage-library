import React from 'react'
import './Card.css'
import { Link } from 'react-router-dom';

const CardUi = (props) => {
    return ( 
        <div className="card text-center shadow">
            <div className="overflow">
                <img src={props.imgSrc} alt="img 1" className="card-img-top" />
            </div>
            <div className="card-body text-dark">
                <h4 className="card-title">{ props.title }</h4>
                <p className="card-text text-secondary">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas numquam odio iusto sunt sed saepe ea. Accusamus deserunt enim doloremque! Excepturi 
                    pariatur modi natus ratione sapiente dolorum quas tempora soluta!
                </p>
                <Link to="#" className="btn btn-outline-success">Go anywhere</Link>
            </div>
        </div>
     );
}
 
export default CardUi;
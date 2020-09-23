import React from 'react'
import './Card.css'

const CardUi = (props) => {
    const lending = 'Lend the book from the library to the student or teacher and make sure it is in secure hands'
    const returning = 'Make sure that the books borrowed by the teacher or student from the library has been returned in time'
    const managing = 'Manage all books in the library for both students and teachers'
    return (
        <div className="card text-center shadow bg-transparent">
            <div className="overflow">
                <img src={props.imgSrc} alt="img" className="card-img-top" />
            </div>
            <div className="card-body text-dark">
                <h4 className="card-title text-white">{props.title}</h4>
                <p className="card-text text-secondary">
                    {props.title === 'Returning Books' && returning}
                    {props.title === 'Lending Books' && lending}
                    {props.title === 'Managing Books' && managing}
                </p>
            </div>
        </div>
    );
}

export default CardUi;
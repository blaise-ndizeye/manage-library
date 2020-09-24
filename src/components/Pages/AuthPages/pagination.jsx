import React from 'react'
import { Link } from 'react-router-dom'

export const Pagination = ({ dataPerPage, totalDatas, paginate }) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalDatas / dataPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <nav className="pagination"><span className="text-light bg-dark mr-2">Pages</span>
            {pageNumbers.map(number => (
                <li key={number} className="page-item">
                    <Link onClick={() => paginate(number)} to="#" className="page-link">
                        {number}
                    </Link>
                </li>
            ))}
        </nav>
    )
}

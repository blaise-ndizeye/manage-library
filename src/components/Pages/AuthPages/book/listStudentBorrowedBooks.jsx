import React from 'react'
import moment from 'moment'

const ListBorrowedBook = (props) => {
    let { date, bookId, bookType, bookName, index } = props

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{moment(date).format('LL')}</td>
            <td>{bookId}</td>
            <td>{bookType}</td>
            <td>{bookName}</td>
        </tr>
    );
}

export default ListBorrowedBook;
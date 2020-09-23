import React from 'react'

import BookDetails from './bookBorrowed'

const ListRecords = (props) => {
    let { firstName, lastName, gender, phone, numOfBooks, index, bookName, bookType, date } = props
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{phone}</td>
            <td>{gender}</td>
            <td>
                <BookDetails
                    numOfBooks={numOfBooks}
                    bookType={bookType}
                    bookName={bookName}
                    date={date} />
            </td>
        </tr>
    );
}

export default ListRecords;
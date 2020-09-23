import React from 'react'
import BookDetails from './bookBorrowed'

const ListBorrowers = (props) => {
    let { firstName, lastName, gender, Class, bookId, index, bookName, bookType, date } = props
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{Class}</td>
            <td>{gender}</td>
            <td>
                <BookDetails
                    bookId={bookId}
                    bookType={bookType}
                    bookName={bookName}
                    date={date} />
            </td>
        </tr>
    );
}

export default ListBorrowers;
import React from 'react'

import ReturnStudentModal from '../../../student/ReturnStudent'
import DeleteBorrower from '../../../student/DeleteBorrower'

import BookDetails from './bookBorrowed'

const ListBorrowers = (props) => {
    let { firstName, lastName, Class, id, bookId, index, bookName, bookType, date } = props
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{Class}</td>
            <td>
                <BookDetails
                    bookId={bookId}
                    bookType={bookType}
                    bookName={bookName}
                    date={date} />
            </td>
            <td>
                <ReturnStudentModal
                    bookId={bookId}
                    bookType={bookType}
                    bookName={bookName}
                    studentId={id} />
            </td>
            <td>
                <DeleteBorrower
                    bookId={bookId}
                    bookType={bookType}
                    bookName={bookName}
                    studentId={id} />
            </td>
        </tr>
    );
}

export default ListBorrowers;
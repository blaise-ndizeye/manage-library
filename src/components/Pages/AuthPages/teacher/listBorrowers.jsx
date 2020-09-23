import React from 'react'

import BookDetails from './bookBorrowed'
import ReturnTeacher from '../../../teacher/ReturnTeacher'
import DeleteBorrowers from '../../../teacher/DeleteBorrower'

const ListBorrowers = (props) => {
    let { firstName, lastName, id, phone, numOfBooks, index, bookName, bookType, date } = props
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{phone}</td>
            <td>
                <BookDetails
                    numOfBooks={numOfBooks}
                    bookType={bookType}
                    bookName={bookName}
                    date={date} />
            </td>
            <td>
                <ReturnTeacher
                    bookType={bookType}
                    bookName={bookName}
                    teacherId={id} />
            </td>
            <td>
                <DeleteBorrowers
                    bookName={bookName}
                    bookType={bookType}
                    teacherId={id} />
            </td>
        </tr>
    );
}

export default ListBorrowers;
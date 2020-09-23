import React from 'react'
import moment from 'moment'

import ReturnFinalistModal from '../../../student/ReturnFinalist'
import BookDetails from './bookBorrowed'
import DeleteFinalistModal from '../../../student/DeleteFinalist'

const ListBorrowers = (props) => {
    let { firstName, lastName, Class, gender, age, id, bookId, index, bookName, bookType, date, dateBorrowed } = props
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{Class}</td>
            <td>{gender}</td>
            <td>{age}</td>
            <td>{moment(date).format('LL')}</td>
            <td>
                <BookDetails
                    bookId={bookId}
                    bookType={bookType}
                    bookName={bookName}
                    date={dateBorrowed} />
            </td>
            <td>
                <DeleteFinalistModal
                    studentId={id} />
            </td>
            <td>
                <ReturnFinalistModal
                    studentId={id} />
            </td>
        </tr>
    );
}

export default ListBorrowers;
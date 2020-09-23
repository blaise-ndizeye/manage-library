import React from 'react'
import moment from 'moment'

import DeleteBook from '../../../book/DeleteBook'
import UpdateBook from '../../../book/UpdateBook'

const ListItem = (props) => {
    let { numOfBooks, typeOfBooks, date, index, id } = props
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{numOfBooks}</td>
            <td>{typeOfBooks}</td>
            <td>{moment(date).format('LL')}</td>
            <td>
                <UpdateBook
                    numOfBooks={numOfBooks}
                    typeOfBooks={typeOfBooks}
                    bookId={id}
                />
            </td>
            <td>
                <DeleteBook bookId={id} />
            </td>
        </tr>
    );
}

export default ListItem;
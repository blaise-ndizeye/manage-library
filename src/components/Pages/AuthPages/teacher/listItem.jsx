import React from 'react'
import DeleteTeacher from '../../../teacher/DeleteTeacher'
import UpdateTeacher from '../../../teacher/UpdateTeacher'
import LendTeacher from '../../../teacher/LendTeacher'

const ListItem = (props) => {
    let { firstName, lastName, phone, gender, index, id } = props
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{gender}</td>
            <td>{phone}</td>
            <td>
                <UpdateTeacher
                    firstName={firstName}
                    lastName={lastName}
                    gender={gender}
                    phone={phone}
                    teacherId={id}
                />
            </td>
            <td>
                <DeleteTeacher teacherId={id} />
            </td>
            <td>
                <LendTeacher teacherId={id} />
            </td>
        </tr>
    );
}

export default ListItem;
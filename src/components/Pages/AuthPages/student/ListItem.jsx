import React from 'react'

import DeleteStudent from '../../../student/DeleteStudent'
import UpdateStudent from '../../../student/UpdateStudent'
import LendStudent from '../../../student/LendStudent'
import { AiOutlineExport } from 'react-icons/ai'

const ListItem = (props) => {
    let { firstName, lastName, Class, age, gender, index, id, lend } = props

    function getBadgeClasses() {
        let classes = 'badge badge-';
        classes += lend === 0 ? 'warning' : 'primary';
        return classes;
    }
    return (
        <tbody>
            <tr>
                <td>{index + 1}</td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{Class}</td>
                <td>{gender}</td>
                <td>{age}</td>
                <td>
                    <button className="btn btn-light" disabled type="button">
                        Lend <span className={getBadgeClasses()}>{lend}</span>
                    </button>
                </td>
                <td>
                    <UpdateStudent
                        firstName={firstName}
                        lastName={lastName}
                        Class={Class}
                        gender={gender}
                        age={age}
                        studentId={id}
                    />
                </td>
                <td>
                    <DeleteStudent studentId={id} />
                </td>
                <td>
                    {lend !== 0 ? <LendStudent
                        borrowerId={id}
                        lend={lend}
                    /> : <button className="btn btn-outline-danger"><AiOutlineExport /></button>}
                </td>
            </tr>
        </tbody>
    );
}

export default ListItem;
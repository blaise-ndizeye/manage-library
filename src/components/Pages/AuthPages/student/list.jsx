import React, { useEffect, memo, useState } from 'react'
import { Table, Container } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { BsFillPeopleFill } from 'react-icons/bs'

import ListItem from './ListItem'
import Loader from '../../../pageEffect/loader'
import { studentSuccess, studentListSearch } from '../../../actions/student/studentAction'
import InputForm from './input'

const StudentList = (props) => {

    const auth = useSelector(state => state.auth)
    const isLoading = useSelector(state => state.student.isLoading)
    const students = useSelector(state => state.student.students)
    const dispatch = useDispatch()
    const [q, setQ] = useState("")
    const noStudentFound = <h3 className="text-center text-danger display-4">No Students found!!</h3>

    useEffect(() => {
        dispatch(studentSuccess(auth.user._id))
    }, [isLoading, dispatch, auth.user._id])

    useEffect(() => {
        if (q) {
            dispatch(studentListSearch(q))
        } else {
            dispatch(studentSuccess(auth.user._id))
        }
    }, [q, dispatch, auth.user._id])


    const singleStudent = students.map((student, index) => <ListItem key={student._id}
        firstName={student.firstName}
        lastName={student.lastName}
        Class={student.Class}
        gender={student.gender}
        age={student.age}
        index={index}
        id={student._id}
        userId={student.userId}
        lend={student.lend}
    />)
    if (isLoading) {
        return <Loader />
    }
    else if (!auth.isAunthenticated) {
        return <Redirect to="/" />
    }
    return (
        <Container>
            <h2 className="display-5 text-primary"><BsFillPeopleFill /> Student's List</h2>
            <div style={{ marginBottom: '20px' }}>
                <InputForm setQ={setQ} q={q} />
            </div>
            <Table responsive className="table-hover table-dark">
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Class</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>Lend</th>
                    </tr>
                </thead>

                {students.length > 0 && singleStudent}

            </Table>
            {!students.length && noStudentFound}

        </Container>
    )
}

export default memo(StudentList);
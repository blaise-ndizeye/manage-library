import React, { useEffect, useState } from 'react'
import { Table, Container } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { BsFillPeopleFill } from 'react-icons/bs'

import ListRecords from './listRecords'
import Loader from '../../../pageEffect/loader'
import { teacherRecords, teacherRecordSearch } from '../../../actions/teacher/teacherAction'
import InputForm from '../student/input'

const TeacherRecordsList = (props) => {

    const auth = useSelector(state => state.auth)
    const isLoading = useSelector(state => state.teacher.isLoading)
    const records = useSelector(state => state.teacher.records)
    const dispatch = useDispatch()
    const [q, setQ] = useState("")
    const noTeacherFound = <h3 className="text-center text-danger display-4">No Records Found!!</h3>

    useEffect(() => {
        dispatch(teacherRecords(auth.user._id))
    }, [isLoading, auth.user._id, dispatch])

    useEffect(() => {
        if (q) {
            dispatch(teacherRecordSearch(q))
        } else {
            dispatch(teacherRecords(auth.user._id))
        }
    }, [q, dispatch, auth.user._id])

    const singleRecord = records.map((record, index) => {
        return <ListRecords key={index}
            id={record.teacherId}
            firstName={record.firstName}
            lastName={record.lastName}
            phone={record.phone}
            gender={record.gender}
            index={index}
            numOfBooks={record.numOfBooks}
            bookName={record.bookName}
            bookType={record.bookType}
            date={record.dateBorrowed}
        />
    })
    if (isLoading) {
        return <Loader />
    }
    else if (!auth.isAunthenticated) {
        return <Redirect to="/" />
    }
    return <Container>
        <h2 className="display-5 text-primary"><BsFillPeopleFill />Teachers' Records List</h2>
        <div style={{ marginBottom: '20px' }}>
            <InputForm setQ={setQ} q={q} />
        </div>
        <Table responsive className="table-hover table-dark">
            <thead color="dark">
                <tr>
                    <th>Index</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone</th>
                    <th>Gender</th>
                    <th>Book Details</th>
                </tr>
            </thead>
            <tbody>
                {records.length > 0 && singleRecord}
            </tbody>
        </Table>
        {!records.length && noTeacherFound}
    </Container>
}

export default TeacherRecordsList;
import React, { useEffect, memo, useState } from 'react'
import { Table, Container } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { BsFillPersonLinesFill } from 'react-icons/bs'

import ListFinalist from './listFinalist'
import Loader from '../../../pageEffect/loader'
import { finalistList, finalistsSearch } from '../../../actions/student/studentAction'
import InputForm from './input'

const FinalistListComponent = (props) => {

    const auth = useSelector(state => state.auth)
    const isLoading = useSelector(state => state.student.isLoading)
    const finalists = useSelector(state => state.student.finalists)
    const dispatch = useDispatch()
    const [q, setQ] = useState("")
    const noStudentFound = <h3 className="text-center text-danger display-4">No Finalists found!!</h3>

    useEffect(() => {
        dispatch(finalistList(auth.user._id))
    }, [isLoading, dispatch, auth.user._id])

    useEffect(() => {
        if (q) {
            dispatch(finalistsSearch(q))
        } else {
            dispatch(finalistList(auth.user._id))
        }
    }, [q, dispatch, auth.user._id])


    const singleFinalist = finalists.map((finalist, index) => <ListFinalist key={finalist._id}
        firstName={finalist.firstName}
        lastName={finalist.lastName}
        Class={finalist.Class}
        gender={finalist.gender}
        age={finalist.age}
        index={index}
        id={finalist._id}
        userId={finalist.userId}
        date={finalist.date}
        bookId={finalist.bookId}
        bookType={finalist.bookType}
        bookName={finalist.bookName}
        dateBorrowed={finalist.dateBorrowed}
    />)
    if (isLoading) {
        return <Loader />
    }
    else if (!auth.isAunthenticated) {
        return <Redirect to="/" />
    }
    return (
        <Container>
            <h2 className="display-5"><BsFillPersonLinesFill />Finalists' List</h2>
            <div style={{ marginBottom: '20px' }}>
                <InputForm setQ={setQ} q={q} />
            </div>
            <Table responsive className="table-hover">
                <thead color="dark">
                    <tr>
                        <th>Index</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Class</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Date Added</th>
                        <th>Book Details</th>
                        <th>Delete</th>
                        <th>Return</th>
                    </tr>
                </thead>
                <tbody>

                    {finalists.length > 0 && singleFinalist}

                </tbody>

            </Table>
            {!finalists.length && noStudentFound}

        </Container>
    )
}

export default memo(FinalistListComponent);
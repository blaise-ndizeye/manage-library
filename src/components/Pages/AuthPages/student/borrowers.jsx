import React, { useEffect, useState } from 'react'
import { Table, Container } from 'reactstrap'

import ListBorrowers from './listBorrowers'
import { useSelector, connect, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Loader from '../../../pageEffect/loader'
import { studentBorrowerList, studentBorrowerSearch } from '../../../actions/student/studentAction'
import InputForm from './input'
import { BsFillPeopleFill } from 'react-icons/bs'
import { Pagination } from '../pagination'

const StudentBorrowersList = (props) => {

    const auth = useSelector(state => state.auth)
    const isLoading = useSelector(state => state.student.isLoading)
    const borrowers = useSelector(state => state.student.borrowers)
    const dispatch = useDispatch()
    const [q, setQ] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [studentsPerPage] = useState(5)
    const noStudentFound = <h3 className="text-center text-danger display-4">No Borrowers found!!</h3>

    const indexOfLastStudent = currentPage * studentsPerPage
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage
    const currentBorrowers = borrowers.slice(indexOfFirstStudent, indexOfLastStudent)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    useEffect(() => {
        props.studentBorrowerList(auth.user._id)
    }, [isLoading, auth.user._id, props])

    useEffect(() => {
        if (q) {
            dispatch(studentBorrowerSearch(q))
        } else {
            dispatch(studentBorrowerList(auth.user._id))
        }
    }, [q, dispatch, auth.user._id])

    const singleBorrower = currentBorrowers.map((borrower, index) => {
        return <ListBorrowers key={index}
            _id={borrower._id}
            id={borrower.studentId}
            firstName={borrower.firstName}
            lastName={borrower.lastName}
            Class={borrower.Class}
            gender={borrower.gender}
            index={index}
            bookId={borrower.bookId}
            bookName={borrower.bookName}
            bookType={borrower.bookType}
            date={borrower.dateBorrowed}
        />
    })
    if (isLoading) {
        return <Loader />
    }
    else if (!auth.isAunthenticated) {
        return <Redirect to="/" />
    }
    return <Container>
        <h2 className="display-5 text-primary"><BsFillPeopleFill /> Students' Borrowers List</h2>
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
                    <th>Book Details</th>
                    <th>Return</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {borrowers.length > 0 && singleBorrower}
            </tbody>
        </Table>
        {!borrowers.length && noStudentFound}
        {borrowers.length > 5 && <Pagination
            dataPerPage={studentsPerPage}
            totalDatas={borrowers.length}
            paginate={paginate} />}
    </Container>
}

export default connect(null, { studentBorrowerList })(StudentBorrowersList);
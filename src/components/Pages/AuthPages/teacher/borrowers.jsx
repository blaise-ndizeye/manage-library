import React, { useEffect, memo, useState } from 'react'
import { Table, Container } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import ListBorrowers from './listBorrowers'
import Loader from '../../../pageEffect/loader'
import { teacherBorrowerList, teacherBorrowerSearch } from '../../../actions/teacher/teacherAction'
import InputForm from '../student/input'
import { BsFillPeopleFill } from 'react-icons/bs'
import { Pagination } from '../pagination'

const StudentBorrowersList = (props) => {

    const auth = useSelector(state => state.auth)
    const isLoading = useSelector(state => state.teacher.isLoading)
    const borrowers = useSelector(state => state.teacher.borrowers)
    const dispatch = useDispatch()
    const [q, setQ] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [teachersPerPage] = useState(5)
    const noTeacherFound = <h3 className="text-center text-danger display-4">No Borrowers found!!</h3>

    const indexOfLastTeacher = currentPage * teachersPerPage
    const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage
    const currentBorrowers = borrowers.slice(indexOfFirstTeacher, indexOfLastTeacher)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    useEffect(() => {
        dispatch(teacherBorrowerList(auth.user._id))
    }, [isLoading, auth.user._id, dispatch])

    useEffect(() => {
        if (q) {
            dispatch(teacherBorrowerSearch(q))
        } else {
            dispatch(teacherBorrowerList(auth.user._id))
        }
    }, [q, dispatch, auth.user._id])

    const singleBorrower = currentBorrowers.map((borrower, index) => {
        return <ListBorrowers key={index}
            id={borrower.teacherId}
            firstName={borrower.firstName}
            lastName={borrower.lastName}
            phone={borrower.phone}
            gender={borrower.gender}
            index={index}
            numOfBooks={borrower.numOfBooks}
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
        <h2 className="display-5 text-primary"><BsFillPeopleFill /> Teachers' Borrowers List</h2>
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
                    <th>Book Details</th>
                    <th>Return</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {borrowers.length > 0 && singleBorrower}
            </tbody>
        </Table>
        {!borrowers.length && noTeacherFound}
        {borrowers.length > 5 && <Pagination
            dataPerPage={teachersPerPage}
            totalDatas={borrowers.length}
            paginate={paginate} />}
    </Container>
}

export default memo(StudentBorrowersList);
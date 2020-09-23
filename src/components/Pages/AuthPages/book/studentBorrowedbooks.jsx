import React, { useState, useEffect } from 'react'
import { Table, Container } from 'reactstrap'
import ListBorowedBooks from './listStudentBorrowedBooks'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Loader from '../../../pageEffect/loader'
import { studentBorrowedBookSearch, studentBorrowedBookList } from '../../../actions/student/studentAction'
import InputForm from '../student/input'
import { GoBook } from 'react-icons/go'

const StudentBorrowedBooks = (props) => {

    const auth = useSelector(state => state.auth)
    const isLoading = useSelector(state => state.student.isLoading)
    const borrowedBooks = useSelector(state => state.student.borrowedBooks)
    const [q, setQ] = useState("")
    const dispatch = useDispatch()
    const noBookFound = <h3 className="text-center text-danger display-4">No Borrowed Books found!!</h3>

    const singleBorrowedBook = borrowedBooks.map((borrowedBook, index) => {
        return <ListBorowedBooks key={index}
            id={borrowedBook._id}
            date={borrowedBook.dateBorrowed}
            index={index}
            bookId={borrowedBook.bookId}
            bookName={borrowedBook.bookName}
            bookType={borrowedBook.bookType}
        />
    })
    useEffect(() => {
        if (q) {
            dispatch(studentBorrowedBookSearch(q))
        } else {
            dispatch(studentBorrowedBookList(auth.user._id))
        }
    }, [q, dispatch, auth.user._id])

    if (isLoading) {
        return <Loader />
    }
    else if (!auth.isAunthenticated) {
        return <Redirect to="/" />
    }

    return <Container>
        <h2 className="display-5"><GoBook /> Students' Borrowed Books List</h2>
        <div style={{ marginBottom: '20px' }}>
            <InputForm setQ={setQ} q={q} />
        </div>
        <Table responsive className="table-hover">
            <thead color="dark">
                <tr>
                    <th>Index</th>
                    <th>Date Borrowed</th>
                    <th>Book Id</th>
                    <th>Book Type</th>
                    <th>Book Name</th>
                </tr>
            </thead>
            <tbody>
                {borrowedBooks.length > 0 && singleBorrowedBook}
            </tbody>
        </Table>
        {!borrowedBooks.length && noBookFound}

    </Container>
}

export default StudentBorrowedBooks;
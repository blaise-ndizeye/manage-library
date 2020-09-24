import React, { useState, useEffect } from 'react'
import { Table, Container } from 'reactstrap'
import ListBorowedBooks from './listTeacherBorrowedBooks'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Loader from '../../../pageEffect/loader'
import { teacherBorrowedBookSearch, teacherBorrowedBookList } from '../../../actions/teacher/teacherAction'
import InputForm from '../student/input'
import { GoBook } from 'react-icons/go'
import { Pagination } from '../pagination'

const StudentBorrowedBooks = (props) => {

    const auth = useSelector(state => state.auth)
    const isLoading = useSelector(state => state.teacher.isLoading)
    const borrowedBooks = useSelector(state => state.teacher.borrowedBooks)
    const dispatch = useDispatch()
    const [q, setQ] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [booksPerPage] = useState(5)
    const noBookFound = <h3 className="text-center text-danger display-4">No Borrowed Books found!!</h3>

    const indexOfLastBook = currentPage * booksPerPage
    const indexOfFirstBook = indexOfLastBook - booksPerPage
    const currentBooks = borrowedBooks.slice(indexOfFirstBook, indexOfLastBook)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    useEffect(() => {
        if (q) {
            dispatch(teacherBorrowedBookSearch(q))
        } else {
            dispatch(teacherBorrowedBookList(auth.user._id))
        }
    }, [q, dispatch, auth.user._id])

    const singleBorrowedBook = currentBooks.map((borrowedBook, index) => {
        return <ListBorowedBooks key={index}
            id={borrowedBook._id}
            date={borrowedBook.dateBorrowed}
            index={index}
            numOfBooks={borrowedBook.numOfBooks}
            bookName={borrowedBook.bookName}
            bookType={borrowedBook.bookType}
        />
    })
    if (isLoading) {
        return <Loader />
    }
    else if (!auth.isAunthenticated) {
        return <Redirect to="/" />
    }
    return <Container>
        <h2 className="display-5 text-primary"><GoBook /> Teachers' Borrowed Books List</h2>
        <div style={{ marginBottom: '20px' }}>
            <InputForm setQ={setQ} q={q} />
        </div>
        <Table responsive className="table-hover table-dark">
            <thead color="dark">
                <tr>
                    <th>Index</th>
                    <th>Date Borrowed</th>
                    <th>Number Of Books</th>
                    <th>Book Type</th>
                    <th>Book Name</th>
                </tr>
            </thead>
            <tbody>
                {borrowedBooks.length > 0 && singleBorrowedBook}
            </tbody>
        </Table>
        {!borrowedBooks.length && noBookFound}

        {borrowedBooks.length > 5 && <Pagination
            dataPerPage={booksPerPage}
            totalDatas={borrowedBooks.length}
            paginate={paginate} />}
    </Container>
}

export default StudentBorrowedBooks;
import React, { Component } from 'react'
import Clock from 'react-digital-clock'
import moment from 'moment'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { BsFillPeopleFill, BsFillPersonLinesFill, BsFillPersonCheckFill } from 'react-icons/bs'
import { GoBook } from 'react-icons/go'

import './css/home.css'
import { studentSuccess, studentBorrowerList, studentBorrowedBookList, studentRecords, finalistList } from '../../actions/student/studentAction'
import { teacherSuccess, teacherBorrowerList, teacherBorrowedBookList, teacherRecords } from '../../actions/teacher/teacherAction'
import { bookSuccess } from '../../actions/book/bookAction'
import AddStudent from '../../student/AddStudent'
import AddTeacher from '../../teacher/AddTeacher'
import AddBook from '../../book/AddBook'
import { AiFillCalendar } from 'react-icons/ai'
import Loader from '../../pageEffect/loader'


moment.suppressDeprecationWarnings = true;

class Home extends Component {

    async componentDidMount() {
        const { auth, teacherRecords, finalistList, studentSuccess, studentRecords, teacherBorrowedBookList, teacherSuccess, bookSuccess, studentBorrowerList, studentBorrowedBookList, teacherBorrowerList } = this.props
        await studentSuccess(auth.user._id)
        await teacherSuccess(auth.user._id)
        await bookSuccess(auth.user._id)
        await studentBorrowerList(auth.user._id)
        await studentBorrowedBookList(auth.user._id)
        await teacherBorrowerList(auth.user._id)
        await teacherBorrowedBookList(auth.user._id)
        await studentRecords(auth.user._id)
        await teacherRecords(auth.user._id)
        await finalistList(auth.user._id)
    }


    render() {

        const curDate = new Date().toLocaleString()
        const { numOfTeachers, numOfTeacherRecords, numOfFinalists, numOfStudentRecords, numOfStudents, numOfBooks, numOfStudentBorrowers, numOfTeacherBorrowers, auth } = this.props
        const user = auth.user.name

        if (auth.isLoading) {
            return <Loader />
        }
        else if (!auth.isAunthenticated) {
            this.props.history.push('/')
        }

        return <div className="contain row">
            <div className="bg2 col-md-4 col-sm-12">
                <h2><BsFillPersonCheckFill /> Welcome {user ? user.charAt(0).toUpperCase() + user.slice(1) : 'Loading...'}</h2>
                <p>to 'Library Management System'</p>
            </div>
            <div className="bg1 col-md-4 col-sm-12">
                <h2> {numOfStudents} {numOfStudents > 1 ? 'Students' : 'Student'}</h2>
                <p><Link to="#" role="button" color="dark">
                    <AddStudent />
                </Link></p>
                <p><Link to="/student/list" role="button" color="dark">
                    <Button onClick={this.handleCheckLending} outline className="m-15" color="primary"><BsFillPeopleFill /> Student's List</Button>
                </Link></p><br />
            </div>
            <div className="bg1 col-md-4 col-sm-12">
                <h2>{numOfTeachers} {numOfTeachers > 1 ? 'Teachers' : 'Teacher'}</h2>
                <p><Link to="#" role="button" color="dark">
                    <AddTeacher />
                </Link></p>
                <p><Link to="/teacher/list" role="button" color="dark">
                    <Button outline className="m-15" color="primary"><BsFillPeopleFill /> Teacher's List</Button>
                </Link></p><br />
            </div>
            <div className="bg2 col-md-3 col-sm-12">
                <h2>{numOfBooks} {numOfBooks > 1 ? 'Books' : 'Book'}</h2>
                <p><Link to="#" role="button" color="dark">
                    <AddBook />
                </Link></p>
                <p><Link to="/book/list" role="button" color="dark">
                    <Button outline className="m-15" color="primary"><GoBook /> Book List</Button>
                </Link></p><br />
            </div>
            <div className="bg2 col-md-5 col-sm-12">
                <h2>{numOfStudentBorrowers} {numOfStudentBorrowers > 1 ? 'Student Borrowers' : 'Student Borrower'}</h2>
                <p><Link to="/student/borrowers" role="button" color="dark">
                    <Button outline className="m-15" color="primary"><BsFillPeopleFill /> Student Borrowers List</Button>
                </Link></p>
                <p><Link to="/student/borrowedBooks" role="button" color="dark">
                    <Button outline className="m-15" color="primary"><GoBook /> Student Borrowed Books List</Button>
                </Link></p><br />
            </div>
            <div className="bg1 col-md-4 col-sm-12">
                <h2>{numOfTeacherBorrowers} {numOfTeacherBorrowers > 1 ? 'Teacher Borrowers' : 'Teacher Borrower'}</h2>
                <p><Link to="/teacher/borrowers" role="button" color="dark">
                    <Button outline className="m-15" color="primary"><BsFillPeopleFill /> Teacher Borrowers List</Button>
                </Link></p>
                <p><Link to="/teacher/borrowedBooks" role="button" color="dark">
                    <Button outline className="m-15" color="primary"><GoBook /> Teacher Borrowed Book List</Button>
                </Link></p><br />
            </div>
            <div className="bg2 col-md-3 col-sm-12">
                <h2>{numOfStudentRecords} {numOfStudentRecords > 1 ? 'Student records' : 'Student Record'}</h2>
                <p><Link to="/student/records" role="button" color="dark">
                    <Button outline className="m-15" color="primary"><BsFillPersonLinesFill /> Student Records List</Button>
                </Link></p><br />
            </div>
            <div className="bg2 col-md-3 col-sm-12">
                <h2>{numOfTeacherRecords} {numOfTeacherRecords > 1 ? 'Teacher Records' : 'Teacher Record'}</h2>
                <p><Link to="/teacher/records" role="button" color="dark">
                    <Button outline className="m-15" color="primary"><BsFillPersonLinesFill /> Teacher Records List</Button>
                </Link></p><br />
            </div>
            <div className="bg2 col-md-3 col-sm-12">
                <h2>{numOfFinalists} {numOfFinalists > 1 ? 'Finalist Borrowers' : 'Finalist Borrower'}</h2>
                <p><Link to="/finalist/list" role="button" color="dark">
                    <Button outline className="m-15" color="primary"><BsFillPeopleFill /> Finalists Borrowers List</Button>
                </Link></p><br />
            </div>
            <div className="bg2 col-md-3 col-sm-12">
                <p><AiFillCalendar /> {moment(curDate).format('LL')}</p>
                <h2><Clock /></h2>
            </div>
        </div>

    }
}


const mapStateToProps = state => ({
    auth: state.auth,
    numOfStudents: state.student.students.length,
    numOfTeachers: state.teacher.teachers.length,
    numOfBooks: state.book.books.length,
    numOfStudentBorrowers: state.student.borrowers.length,
    students: state.student.students,
    numOfStudentBorrowedBooks: state.student.borrowedBooks.length,
    numOfTeacherBorrowers: state.teacher.borrowers.length,
    numOfStudentRecords: state.student.records.length,
    numOfTeacherRecords: state.teacher.records.length,
    numOfFinalists: state.student.finalists.length
})

export default connect(mapStateToProps, { studentRecords, studentSuccess, finalistList, teacherSuccess, teacherRecords, bookSuccess, studentBorrowerList, studentBorrowedBookList, teacherBorrowerList, teacherBorrowedBookList })(Home);
import React, { useEffect, memo, useState } from 'react'
import { Table, Container } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import ListItem from './listItem'
import Loader from '../../../pageEffect/loader'
import { teacherSuccess, teacherListSearch } from '../../../actions/teacher/teacherAction'
import InputForm from '../student/input'
import { BsFillPeopleFill } from 'react-icons/bs'
import { Pagination } from '../pagination'

const TeacherList = (props) => {

    const auth = useSelector(state => state.auth)
    const isLoading = useSelector(state => state.teacher.isLoading)
    const teachers = useSelector(state => state.teacher.teachers)
    const dispatch = useDispatch()
    const [q, setQ] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [teachersPerPage] = useState(5)
    const noTeacherFound = <h3 className="text-center text-danger display-4">No teachers found!!</h3>

    const indexOfLastTeacher = currentPage * teachersPerPage
    const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage
    const currentTeachers = teachers.slice(indexOfFirstTeacher, indexOfLastTeacher)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    useEffect(() => {
        dispatch(teacherSuccess(auth.user._id))
    }, [isLoading, auth.user._id, dispatch])

    useEffect(() => {
        if (q) {
            dispatch(teacherListSearch(q))
        } else {
            dispatch(teacherSuccess(auth.user._id))
        }
    }, [q, dispatch, auth.user._id])

    const singleTeacher = currentTeachers.map((teacher, index) => {
        return <ListItem key={teacher._id}
            firstName={teacher.firstName}
            lastName={teacher.lastName}
            gender={teacher.gender}
            phone={teacher.phone}
            index={index}
            id={teacher._id}
            userId={teacher.userId}
        />
    })
    if (isLoading) {
        return <Loader />
    }
    else if (!auth.isAunthenticated) {
        return <Redirect to="/" />
    }

    return <Container>
        <h2 className="display-5 text-primary"><BsFillPeopleFill /> Teacher's List</h2>
        <div style={{ marginBottom: '20px' }}>
            <InputForm setQ={setQ} q={q} />
        </div>
        <Table responsive className="table-hover table-dark">
            <thead color="dark">
                <tr>
                    <th>Index</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>Lend</th>
                </tr>
            </thead>
            <tbody>
                {teachers.length > 0 && singleTeacher}
            </tbody>
        </Table>
        {!teachers.length && noTeacherFound}

        {teachers.length > 5 && <Pagination
            dataPerPage={teachersPerPage}
            totalDatas={teachers.length}
            paginate={paginate} />}
    </Container>
}

export default memo(TeacherList);
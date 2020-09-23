import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import ChangePasswordModal from '../../../auth/ChangePassword'
import ChangeEmailOrUsernameModal from '../../../auth/ChangeEmailOrUsername'

import '../css/home.css'
import { loadUser } from '../../../actions/auth/authActions'
import DeleteAllBooksModal from '../../../book/DeleteAllBooks'
import DeleteAllStudentBorrowersModal from '../../../student/DeleteAllBorrowers'
import DeleteAllTeacherBorrowersModal from '../../../teacher/DeleteAllBorrowers'
import DeleteAllStudentRecordsModal from '../../../student/DeleteAllRecords'
import DeleteAllStudentsModal from '../../../student/DeleteAllStudents'
import DeleteAllTeachersModal from '../../../teacher/DeleteAllTeachers'
import DeleteAllTeacherRecordsModal from '../../../teacher/DeleteAllRecords'
import DeleteAccountModal from '../../../auth/DeleteAccount'
import PromoteStudentsModal from '../../../student/PromoteAllStudents'
import DeleteAllFinalistsModal from '../../../student/DeleteAllFinalists'
import { AiOutlineWarning } from 'react-icons/ai'

const Settings = (props) => {

    const user = useSelector(state => state.auth.user)
    const isAunthenticated = useSelector(state => state.auth.isAunthenticated)
    const { name, email } = user
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadUser())
        if (!user || !isAunthenticated) {
            props.history.push('/')
        }
    }, [dispatch, name, props.history, user, isAunthenticated])

    return <div className="contain row">
        <div className="bg1 col-md-4 col-sm-12">
            <h2>Advanced <span>Settings</span></h2>
            <br />
            <p><Link to="#" role="button" color="dark">
                <ChangeEmailOrUsernameModal />
            </Link></p>
            <p><Link to="#" role="button" color="dark">
                <ChangePasswordModal />
            </Link></p>
        </div>
        <div className="bg1 col-md-8 col-sm-12">
            <h2>
                Username: <span>{name ? name.charAt(0).toUpperCase() + name.slice(1) : 'Loading...'}</span>
            </h2>
            <p>Email: {email ? email : 'Loading...'}</p>
            <p><Link to="#" role="button" color="dark">
                <DeleteAccountModal />
            </Link></p>
        </div>
        <div className="bg1 col-md-4 col-sm-12">
            <p><Link to="#" role="button" color="dark">
                <DeleteAllStudentsModal />
            </Link></p>
            <p><Link to="#" role="button" color="dark">
                <DeleteAllTeachersModal />
            </Link></p>
            <p><Link to="#" role="button" color="dark">
                <DeleteAllBooksModal />
            </Link></p>
        </div>
        <div className="bg1 col-md-4 col-sm-12">
            <p><Link to="#" role="button" color="dark">
                <DeleteAllStudentBorrowersModal />
            </Link></p>
            <p><Link to="#" role="button" color="dark">
                <DeleteAllTeacherBorrowersModal />
            </Link></p>
        </div>
        <div className="bg1 col-md-4 col-sm-12">
            <p><Link to="#" role="button" color="dark">
                <DeleteAllStudentRecordsModal />
            </Link></p>
            <p><Link to="#" role="button" color="dark">
                <DeleteAllTeacherRecordsModal />
            </Link></p>
        </div>
        <div className="bg1 col-md-5 col-sm-12">
            <p><Link to="#" role="button" color="dark">
                <PromoteStudentsModal />
            </Link></p>
            <p><Link to="#" role="button" color="dark">
                <DeleteAllFinalistsModal />
            </Link></p>
        </div>
        <div className="bg1 col-md-7 col-sm-12">
            <h2 className="text-warning"><AiOutlineWarning /> Once you delete your Account all data will be lost!!</h2>
            <p className="lead text-warning"><AiOutlineWarning /> For Better Performance Settings Above Must Be Performed For Serious Reasons!!</p>
        </div>
    </div>


}

export default Settings;
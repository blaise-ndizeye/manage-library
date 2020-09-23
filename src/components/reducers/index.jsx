import { combineReducers } from 'redux'
import errorReducer from './errorReducer'
import authReducer from './auth/authReducer'
import studentReducer from './student/studentReducer'
import teacherReducer from './teacher/teacherReducer'
import bookReducer from './book/bookReducer'

const rootReducer = combineReducers({
    error: errorReducer,
    auth: authReducer,
    student: studentReducer,
    teacher: teacherReducer,
    book: bookReducer
})

export default rootReducer
import {
    STUDENT_SUCCESS, STUDENT_LOADING, STUDENT_ADD_SUCCESS, STUDENT_DELETE_SUCCESS, STUDENT_ERROR, DELETE_SUCCESS, STUDENT_EDIT_SUCCESS, STUDENT_LENDING_TWO_SUCCESS, STUDENT_BORROWERS_LIST, STUDENT_BORROWEDBOOKS_LIST, STUDENT_RETURN_SUCCESS, STUDENT_RECORDS_LIST, STUDENT_DELETE_BORROWER,
    STUDENT_LIST_SEARCH,
    STUDENT_BORROWERS_SEARCH,
    STUDENT_BORROWEDBOOKS_SEARCH,
    STUDENT_RECORDS_SEARCH,
    DELETE_ALL_STUDENTS,
    DELETE_ALL_STUDENT_RECORDS,
    DELETE_ALL_STUDENT_BORROWERS,
    DELETE_ALL_FINALISTS,
    FINALIST_LIST,
    RETURN_FOR_FINALIST,
    FINALISTS_SEARCH,
    PROMOTE_STUDENTS,
    DELETE_FINALIST
} from '../../actions/actionTypes'

let initialState = {
    success: false,
    students: [],
    borrowers: [],
    borrowedBooks: [],
    records: [],
    finalists: [],
    isLoading: false,
    classes: [
        { value: 'S1', label: 'S1' }, { value: 'S1-A', label: 'S1-A' }, { value: 'S1-B', label: 'S1-B' }, {
            value: 'S2',
            label: 'S2'
        }, { value: 'S2-A', label: 'S2-A' }, { value: 'S2-B', label: 'S2-B' },
        { value: 'S3', label: 'S3' }, { value: 'S3-A', label: 'S3-A' }, { value: 'S3-B', label: 'S3-B' },
        { value: 'S4 MCB', label: 'S4 MCB' }, { value: 'S4 MCB-A', label: 'S4 MCB-A' }, { value: 'S4 MCB-B', label: 'S4 MCB-B' },
        { value: 'S4 MPC', label: 'S4 MPC' }, { value: 'S4 MPC-A', label: 'S4 MPC-A' }, { value: 'S4 MPC-B', label: 'S4 MPC-B' },
        { value: 'S4 PCB', label: 'S4 PCB' }, { value: 'S4 PCB-A', label: 'S4 PCB-A' }, { value: 'S4 PCB-B', label: 'S4 PCB-B' },
        { value: 'S4 PCM', label: 'S4 PCM' }, { value: 'S4 PCM-A', label: 'S4 PCM-A' }, { value: 'S4 PCM-B', label: 'S4 PCM-B' },
        { value: 'S5 MCB', label: 'S5 MCB' }, { value: 'S5 MCB-A', label: 'S5 MCB-A' }, { value: 'S5 MCB-B', label: 'S5 MCB-B' },
        { value: 'S5 MPC', label: 'S5 MPC' }, { value: 'S5 MPC-A', label: 'S5 MPC-A' }, { value: 'S5 MPC-B', label: 'S5 MPC-B' },
        { value: 'S5 PCB', label: 'S5 PCB' }, { value: 'S5 PCB-A', label: 'S5 PCB-A' }, { value: 'S5 PCB-B', label: 'S5 PCB-B' },
        { value: 'S5 PCM', label: 'S5 PCM' }, { value: 'S5 PCM-A', label: 'S5 PCM-A' }, { value: 'S5 PCM-B', label: 'S5PCM-B' },
        { value: 'S6 MCB', label: 'S6 MCB' }, { value: 'S6 MCB-A', label: 'S6 MCB-A' }, { value: 'S6 MCB-B', label: 'S6 MCB-B' },
        { value: 'S6 MPC', label: 'S6 MPC' }, { value: 'S6 MPC-A', label: 'S6 MPC-A' }, { value: 'S6 MPC-B', label: 'S6 MPC-B' },
        { value: 'S6 PCB', label: 'S6 PCB' }, { value: 'S6 PCB-A', label: 'S6 PCB-A' }, { value: 'S6 PCB-B', label: 'S6 PCB-B' },
        { value: 'S6 PCM', label: 'S6 PCM' }, { value: 'S6 PCM-A', label: 'S6 PCM-A' }, { value: 'S6 PCM-B', label: 'S6 PCM-B' }
    ],
    genders: [{ value: 'M', label: 'M' }, { value: 'F', label: 'F' }]
}

export default function (state = initialState, action) {
    switch (action.type) {
        case STUDENT_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case STUDENT_SUCCESS:
            return {
                ...state,
                students: [...action.payload],
                isLoading: false
            }
        case STUDENT_ADD_SUCCESS:
            return {
                ...state,
                success: true,
                students: [action.payload, ...state.students],
                isLoading: false
            }
        case STUDENT_DELETE_SUCCESS:
            return {
                ...state,
                success: false,
                isLoading: false,
                students: state.students.filter(student => student._id !== action.payload)
            }
        case STUDENT_ERROR:
            return {
                ...state,
                success: false,
                isLoading: false,
                students: [...state.students]
            }
        case DELETE_SUCCESS:
            return {
                ...state,
                success: false
            }
        case DELETE_FINALIST:
            return {
                ...state,
                success: false,
                isLoading: false
            }
        case PROMOTE_STUDENTS:
            return {
                ...state,
                success: false,
                isLoading: false
            }
        case STUDENT_EDIT_SUCCESS:
            return {
                ...state,
                success: false,
                students: [action.payload, ...state.students],
                isLoading: false
            }
        case STUDENT_LENDING_TWO_SUCCESS:
            return {
                ...state,
                success: false,
                isLoading: false,
                students: state.students.filter(student => student._id === action.payload.studentId ? student.lend = action.payload.lend : student)
            }
        case STUDENT_BORROWERS_LIST:
            return {
                ...state,
                borrowers: [...action.payload],
                isLoading: false
            }
        case STUDENT_BORROWEDBOOKS_LIST:
            return {
                ...state,
                borrowedBooks: [...action.payload],
                isLoading: false
            }
        case STUDENT_RETURN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: false,
                borrowers: state.borrowers.filter(b => b._id !== action.payload)
            }
        case RETURN_FOR_FINALIST:
            return {
                ...state,
                isLoading: false,
                success: false
            }
        case STUDENT_RECORDS_LIST:
            return {
                ...state,
                records: [...action.payload],
                isLoading: false
            }
        case FINALIST_LIST:
            return {
                ...state,
                finalists: [...action.payload],
                isLoading: false
            }
        case STUDENT_DELETE_BORROWER:
            return {
                ...state,
                isLoading: false,
                success: false
            }
        case STUDENT_LIST_SEARCH:
            return {
                ...state,
                students: state.students.filter(student => action.payload ? student.firstName.toLowerCase().indexOf(action.payload) > -1 || student.lastName.toLowerCase().indexOf(action.payload) > -1 || student.Class.toLowerCase().indexOf(action.payload) > -1 || student.gender.toLowerCase().indexOf(action.payload) > -1 || student.age.toLowerCase().indexOf(action.payload) > -1 : student)
            }
        case STUDENT_BORROWERS_SEARCH:
            return {
                ...state,
                borrowers: state.borrowers.filter(borrower => action.payload ? borrower.firstName.toLowerCase().indexOf(action.payload) > -1 || borrower.lastName.toLowerCase().indexOf(action.payload) > -1 || borrower.Class.toLowerCase().indexOf(action.payload) > -1 || borrower.bookId.toLowerCase().indexOf(action.payload) > -1 || borrower.bookType.toLowerCase().indexOf(action.payload) > -1 || borrower.bookName.toLowerCase().indexOf(action.payload) > -1 : borrower)
            }
        case STUDENT_BORROWEDBOOKS_SEARCH:
            return {
                ...state,
                borrowedBooks: state.borrowedBooks.filter(borrowedBook => action.payload ? borrowedBook.bookId.toLowerCase().indexOf(action.payload) > -1 || borrowedBook.bookType.toLowerCase().indexOf(action.payload) > -1 || borrowedBook.bookName.toLowerCase().indexOf(action.payload) > -1 : borrowedBook)
            }
        case STUDENT_RECORDS_SEARCH:
            return {
                ...state,
                records: state.records.filter(record => action.payload ? record.firstName.toLowerCase().indexOf(action.payload) > -1 || record.lastName.toLowerCase().indexOf(action.payload) > -1 || record.Class.toLowerCase().indexOf(action.payload) > -1 || record.bookId.toLowerCase().indexOf(action.payload) > -1 || record.bookType.toLowerCase().indexOf(action.payload) > -1 || record.bookName.toLowerCase().indexOf(action.payload) > -1 : record)
            }
        case FINALISTS_SEARCH:
            return {
                ...state,
                finalists: state.finalists.filter(finalist => action.payload ? finalist.firstName.toLowerCase().indexOf(action.payload) > -1 || finalist.lastName.toLowerCase().indexOf(action.payload) > -1 || finalist.Class.toLowerCase().indexOf(action.payload) > -1 || finalist.gender.toLowerCase().indexOf(action.payload) > -1 || finalist.age.toLowerCase().indexOf(action.payload) > -1 || finalist.bookId.toLowerCase().indexOf(action.payload) > -1 || finalist.bookType.toLowerCase().indexOf(action.payload) > -1 || finalist.bookName.toLowerCase().indexOf(action.payload) > -1 : finalist)
            }
        case DELETE_ALL_STUDENTS:
            return {
                ...state,
                students: [],
                borrowers: [],
                records: [],
                borrowedBooks: []
            }
        case DELETE_ALL_STUDENT_BORROWERS:
            return {
                ...state,
                borrowers: [],
                borrowedBooks: []
            }
        case DELETE_ALL_STUDENT_RECORDS:
            return {
                ...state,
                records: []
            }
        case DELETE_ALL_FINALISTS:
            return {
                ...state,
                finalists: []
            }
        default:
            return state
    }
}
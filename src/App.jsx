import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { loadUser } from './components/actions/auth/authActions'
import store from './store'
import NavBar from './components/NavBar'
import About from './components/Pages/about'
import StudentList from './components/Pages/AuthPages/student/list';
import TeacherList from './components/Pages/AuthPages/teacher/list';
import BookList from './components/Pages/AuthPages/book/list'
import StudentBorrowersList from './components/Pages/AuthPages/student/borrowers';
import StudentBorrowedBooks from './components/Pages/AuthPages/book/studentBorrowedbooks'
import TeacherBorrowersList from './components/Pages/AuthPages/teacher/borrowers'
import TeacherBorrowedBooksList from './components/Pages/AuthPages/book/teacherBorrowedBooks'
import studentRecordsList from './components/Pages/AuthPages/student/records'
import FinalistListComponent from './components/Pages/AuthPages/student/finalists'
import TeacherRecordsList from './components/Pages/AuthPages/teacher/records'
import Settings from './components/Pages/AuthPages/auth';
import Home from './components/Pages/AuthPages/Home';
import GuestPage from './components/Pages/UnAuthPages/guestpage';

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser())
  }

  render() {
    return (
      <Fragment>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path={'/'} component={GuestPage}></Route>
            <Route path={'/about'} component={About}></Route>
            <Route path={'/student/list'} component={StudentList}></Route>
            <Route path={'/teacher/list'} component={TeacherList}></Route>
            <Route path={'/book/list'} component={BookList}></Route>
            <Route path={'/student/borrowers'} component={StudentBorrowersList}></Route>
            <Route path={'/student/borrowedBooks'} component={StudentBorrowedBooks}></Route>
            <Route path={'/teacher/borrowers'} component={TeacherBorrowersList}></Route>
            <Route path={'/teacher/borrowedBooks'} component={TeacherBorrowedBooksList}></Route>
            <Route path={'/student/records'} component={studentRecordsList}></Route>
            <Route path={'/teacher/records'} component={TeacherRecordsList}></Route>
            <Route path={'/user/settings'} component={Settings}></Route>
            <Route path={'/finalist/list'} component={FinalistListComponent}></Route>
            <Route path={'/home'} component={Home}></Route>
          </Switch>
        </Router>
      </Fragment>
    )
  }
}

export default App;


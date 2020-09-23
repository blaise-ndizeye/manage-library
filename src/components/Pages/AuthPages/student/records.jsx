import React, { Component } from 'react'
import { Table, Container } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { BsFillPersonLinesFill } from 'react-icons/bs'

import ListRecords from './listRecords'
import Loader from '../../../pageEffect/loader'
import InputForm from './input'
import { studentRecordSearch, studentRecords } from '../../../actions/student/studentAction'

class StudentRecordsList extends Component {
    state = {
        q: ""
    }
    componentDidMount() {
        const { auth, studentRecords } = this.props
        studentRecords(auth.user._id)
    }
    componentDidUpdate() {
        const { auth, studentRecords } = this.props
        if (!this.state.q) {
            studentRecords(auth.user._id)
        }
    }
    onChange = async (val) => {
        const { studentRecordSearch } = this.props
        await this.setState({ q: val })
        await studentRecordSearch(this.state.q)
    }
    render() {

        const { auth, isLoading, records } = this.props
        const noStudentFound = <h3 className="text-center text-danger display-4">No Records found!!</h3>
        const singleRecord = records.map((borrower, index) => {
            return <ListRecords key={index}
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
            <h2 className="display-5"><BsFillPersonLinesFill /> Students' Records List</h2>
            <div style={{ marginBottom: '20px' }}>
                <InputForm setQ={this.onChange} q={this.state.q} />
            </div>
            <Table responsive className="table-hover">
                <thead color="dark">
                    <tr>
                        <th>Index</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Class</th>
                        <th>Gender</th>
                        <th>Book Details</th>
                    </tr>
                </thead>
                <tbody>
                    {records.length > 0 && singleRecord}
                </tbody>
            </Table>
            {!records.length && noStudentFound}
        </Container>
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    isLoading: state.student.isLoading,
    records: state.student.records
})

export default connect(mapStateToProps, { studentRecordSearch, studentRecords })(StudentRecordsList);
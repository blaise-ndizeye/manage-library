import React, { Component } from 'react'
import {
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    Form,
    FormGroup,
    Label,
    Input,
    Alert
} from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { lendStudent, deleteSuccess } from '../actions/student/studentAction'
import { clearErrors, clearSuccess } from '../actions/errorAction'
import { Redirect } from 'react-router-dom'
import { AiOutlineExport } from 'react-icons/ai'
import { lendNotify, networkErrorNotify } from '../notification'

class LendStudentModal extends Component {
    state = {
        modal: false,
        bookId: '',
        bookName: '',
        bookType: '',
        $bookType: '',
        $bookName: '',
        $bookId: '',
        msg: null,
        dropdownOpen: false,
        student: this.props.students.find(student => student._id === this.props.borrowerId),
        loading: false
    }

    static propTypes = {
        isAuthententicated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        lendStudent: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {

        const { error, isAunthenticated, success, deleteSuccess, networkError } = this.props
        if (networkError) return networkErrorNotify()
        if (error !== prevProps.error) {
            this.setState({ loading: false })
            if (error.id === 'LEND_STUDENT_FAIL') {
                this.setState({
                    msg: error.msg.message
                })
            } else {
                this.setState({
                    msg: null,
                    bookId: '',
                    bookName: '',
                    bookType: '',
                    $bookId: '',
                    $bookType: '',
                    $bookName: ''
                })
            }
        }
        if (this.state.modal) {
            if (!isAunthenticated) {
                return <Redirect to="/" />
            }
            else if (success) {
                this.toggle()
                deleteSuccess()
                lendNotify('Student')
            }
        }
    }

    toggle = () => {
        this.setState({ loading: false })
        this.props.clearErrors()
        this.setState({
            modal: !this.state.modal
        })
    }

    toggleDropdown = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault()
        const { bookId, bookType, bookName, $bookId, $bookType, $bookName } = this.state
        const { userId, borrowerId } = this.props

        const newBorrower = { bookId, bookType, bookName, $bookId, $bookType, $bookName, userId, borrowerId }
        this.setState({ loading: true })
        this.props.lendStudent(newBorrower)
    }

    handlehiddenInputs() {
        let displays = '';
        displays += this.props.lend === 1 && this.state.student.lend === 1 ? 'none' : 'block';
        return displays;
    }

    render() {
        return (<>

            <button className="btn btn-outline-info" onClick={this.toggle} >
                <AiOutlineExport />
            </button>

            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}><AiOutlineExport /> Lend Student</ModalHeader>
                <ModalBody>
                    {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="bookId">Book Id</Label>
                            <Input type="text"
                                name="bookId"
                                id="bookId"
                                placeholder="Book Id"
                                className="mb-3"
                                onChange={this.onChange} required />

                            <Label for="bookType">Book Type</Label>
                            <Input type="text"
                                name="bookType"
                                id="bookType"
                                placeholder="Boook Type"
                                className="mb-3"
                                onChange={this.onChange} required />

                            <Label for="bookName">Book Name</Label>
                            <Input type="text"
                                name="bookName"
                                id="bookName"
                                placeholder="Book Name"
                                className="mb-3"
                                onChange={this.onChange} required />

                            <div style={{ display: this.handlehiddenInputs() }}>

                                <Label for="$bookId">Second Book Id</Label>
                                <Input type="text"
                                    name="$bookId"
                                    id="$bookId"
                                    placeholder="Add Second Book Id"
                                    className="mb-3"
                                    onChange={this.onChange} />

                                <Label for="$bookType">Second Book Type</Label>
                                <Input type="text"
                                    name="$bookType"
                                    id="$bookType"
                                    placeholder="Add Second Book Type"
                                    className="mb-3"
                                    onChange={this.onChange} />

                                <Label for="$bookName">Second Book Name</Label>
                                <Input type="text"
                                    name="$bookName"
                                    id="$bookName"
                                    placeholder="Add Second Book Name"
                                    className="mb-3"
                                    onChange={this.onChange} />
                            </div>

                            <Button type="submit" color="dark" style={{ marginTop: '2rem' }} block>
                                {this.state.loading ? 'Loading' : (<><AiOutlineExport /> Lend</>)}
                        </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>

        </>);
    }
}
const mapStateToProps = state => ({
    isAunthenticated: state.auth.isAunthenticated,
    error: state.error,
    success: state.student.success,
    userId: state.auth.user._id,
    students: state.student.students,
    networkError: state.auth.networkError
})

export default connect(mapStateToProps, { lendStudent, clearErrors, clearSuccess, deleteSuccess })(LendStudentModal);
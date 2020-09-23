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
import { lendTeacher, deleteSuccess } from '../actions/teacher/teacherAction'
import { clearErrors, clearSuccess } from '../actions/errorAction'
import { Redirect } from 'react-router-dom'
import { AiOutlineExport } from 'react-icons/ai'
import { lendNotify } from '../notification'

class LendTeacherModal extends Component {
    state = {
        modal: false,
        numOfBooks: '',
        bookName: '',
        bookType: '',
        msg: null,
        dropdownOpen: false
    }

    static propTypes = {
        isAuthententicated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        lendTeacher: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {

        const { error, isAunthenticated, success, deleteSuccess } = this.props
        if (error !== prevProps.error) {

            if (error.id === 'LEND_TEACHER_FAIL') {
                this.setState({
                    msg: error.msg.message
                })
            } else {
                this.setState({
                    msg: null,
                    numOfBooks: '',
                    bookName: '',
                    bookType: ''
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
                lendNotify('Teacher')
            }
        }
    }

    toggle = () => {

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
        const { numOfBooks, bookType, bookName } = this.state
        const { userId, teacherId } = this.props

        const newBorrower = { numOfBooks, bookType, bookName, userId, teacherId }

        this.props.lendTeacher(newBorrower)
    }

    render() {
        return (<>

            <button className="btn btn-outline-info" onClick={this.toggle} >
                <AiOutlineExport />
            </button>

            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}><AiOutlineExport /> Lend Teacher</ModalHeader>
                <ModalBody>
                    {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="numOfBooks">Number Of Books</Label>
                            <Input type="number"
                                name="numOfBooks"
                                id="numOfBooks"
                                placeholder="Number Of Books"
                                className="mb-3"
                                onChange={this.onChange} required />

                            <Label for="bookType">Book(s) Type</Label>
                            <Input type="text"
                                name="bookType"
                                id="bookType"
                                placeholder="Boook(s) Type"
                                className="mb-3"
                                onChange={this.onChange} required />

                            <Label for="bookName">Book(s) Name</Label>
                            <Input type="text"
                                name="bookName"
                                id="bookName"
                                placeholder="Book(s) Name"
                                className="mb-3"
                                onChange={this.onChange} required />

                            <Button type="submit" color="dark" style={{ marginTop: '2rem' }} block>
                                <AiOutlineExport /> Lend
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
    success: state.teacher.success,
    userId: state.auth.user._id,
})

export default connect(mapStateToProps, { lendTeacher, clearErrors, clearSuccess, deleteSuccess })(LendTeacherModal);
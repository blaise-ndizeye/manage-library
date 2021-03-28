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
import { Redirect } from 'react-router-dom'
import Select from 'react-select'
import PropTypes from 'prop-types'

import { addTeacher, deleteSuccess } from '../actions/teacher/teacherAction'
import { clearErrors, clearSuccess } from '../actions/errorAction'
import { BsPersonPlusFill } from 'react-icons/bs'
import { addNotify, networkErrorNotify } from '../notification'

class AddTeacherModal extends Component {
    state = {
        modal: false,
        firstName: '',
        lastName: '',
        gender: '',
        phone: '',
        msg: null,
        dropdownOpen: false
    }

    static propTypes = {
        isAuthententicated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        addTeacher: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, isAunthenticated, success, deleteSuccess, networkError } = this.props
        if (networkError) return networkErrorNotify()
        if (error !== prevProps.error) {

            if (error.id === 'ADD_TEACHER_FAIL') {
                this.setState({
                    msg: error.msg.message
                })
            } else {
                this.setState({
                    msg: null,
                    firstName: '',
                    lastName: '',
                    phone: '',
                    gender: ''
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
                addNotify('Teacher')
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
        const { firstName, lastName, gender, phone } = this.state
        const userId = this.props.user

        const newTeacher = { firstName, lastName, gender, phone, userId }

        this.props.addTeacher(newTeacher)
    }

    handleGender = async (e) => {
        await this.setState({
            gender: e.value
        })
    }

    render() {
        return (<>

            <Button outline color="primary" onClick={this.toggle} >
                <BsPersonPlusFill /> Add Teacher
        </Button>

            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}><BsPersonPlusFill /> Add Teacher</ModalHeader>
                <ModalBody>
                    {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="firstName">First Name</Label>
                            <Input type="text"
                                name="firstName"
                                id="firstName"
                                placeholder="Add First Name"
                                className="mb-3"
                                onChange={this.onChange} required />

                            <Label for="lastName">Last Name</Label>
                            <Input type="text"
                                name="lastName"
                                id="lastName"
                                placeholder="Add Last Name"
                                className="mb-3"
                                onChange={this.onChange} required />

                            <Label for="gender">Gender</Label>
                            <Select name="gender" onChange={this.handleGender}
                                options={this.props.genders} />

                            <Label for="phone">Phone Number</Label>
                            <Input type="number"
                                name="phone"
                                id="phone"
                                placeholder="Add the phone number"
                                className="mb-3"
                                onChange={this.onChange} required />

                            <Button type="submit" color="dark" style={{ marginTop: '2rem' }} block>
                                <BsPersonPlusFill /> Add
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
    user: state.auth.user._id,
    genders: state.student.genders,
    networkError: state.auth.networkError
})

export default connect(mapStateToProps, { addTeacher, clearErrors, clearSuccess, deleteSuccess })(AddTeacherModal);
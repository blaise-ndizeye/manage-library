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
import { BsPersonPlusFill } from 'react-icons/bs'
import Select from 'react-select'

import { addNotify } from '../notification'
import { addStudent, deleteSuccess } from '../actions/student/studentAction'
import { clearErrors, clearSuccess } from '../actions/errorAction'
import { Redirect } from 'react-router-dom'

class AddStudentModal extends Component {
    state = {
        modal: false,
        firstName: '',
        lastName: '',
        Class: '',
        gender: '',
        age: '',
        msg: null,
        dropdownOpen: false
    }

    static propTypes = {
        isAuthententicated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        addStudent: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {

        const { error, isAunthenticated, success, deleteSuccess } = this.props
        if (error !== prevProps.error) {

            if (error.id === 'ADD_STUDENT_FAIL') {
                this.setState({
                    msg: error.msg.message
                })
            } else {
                this.setState({
                    msg: null,
                    firstName: '',
                    lastName: '',
                    Class: '',
                    gender: '',
                    age: ''
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
                addNotify('Student')
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
        const { firstName, lastName, gender, Class, age } = this.state
        const userId = this.props.user

        const newStudent = { firstName, lastName, gender, Class, age, userId }

        this.props.addStudent(newStudent)
    }

    handleClasse = async (e) => {
        await this.setState({
            Class: e.value
        })
    }
    handleGender = async (e) => {
        await this.setState({
            gender: e.value
        })
    }

    render() {
        return (<>

            <Button outline color="primary" onClick={this.toggle} >
                <BsPersonPlusFill /> Add Student
        </Button>

            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}><BsPersonPlusFill /> Add Student</ModalHeader>
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

                            <Label for="Class" >Class</Label>
                            <Select name="Class" onChange={this.handleClasse}
                                options={this.props.classes} />

                            <Label for="gender">Gender</Label>
                            <Select name="gender" onChange={this.handleGender}
                                options={this.props.genders} />

                            <Label for="age">Birth Year</Label>
                            <Input type="number"
                                name="age"
                                id="age"
                                placeholder="Add the birth year"
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
    success: state.student.success,
    user: state.auth.user._id,
    genders: state.student.genders,
    classes: state.student.classes
})

export default connect(mapStateToProps, { addStudent, clearErrors, clearSuccess, deleteSuccess })(AddStudentModal);
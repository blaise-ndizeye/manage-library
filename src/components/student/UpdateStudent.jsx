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
import { Redirect } from 'react-router-dom'
import Select from 'react-select'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { AiOutlineEdit } from 'react-icons/ai'

import { editStudent } from '../actions/student/studentAction'
import { clearErrors, clearSuccess } from '../actions/errorAction'
import { networkErrorNotify, updateNotify } from '../notification'

class EditStudentModal extends Component {
    state = {
        modal: false,
        firstName: '',
        lastName: '',
        Class: '',
        gender: '',
        age: '',
        msg: null,
        dropdownOpen: false,
        loading: false
    }

    static propTypes = {
        isAuthententicated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        editStudent: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {

        const { error, isAunthenticated, networkError } = this.props
        if (networkError) return networkErrorNotify()
        if (error !== prevProps.error) {
            this.setState({ loading: false })
            if (error.id === 'EDIT_STUDENT_FAIL') {
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

    onSubmit = async (e) => {
        e.preventDefault()
        let { firstName, lastName, gender, Class, age } = this.state
        if (!firstName) {
            firstName = this.props.firstName
        }
        if (!lastName) {
            lastName = this.props.lastName
        }
        if (!gender) {
            gender = this.props.gender
        }
        if (!Class) {
            Class = this.props.Class
        }
        if (!age) {
            age = this.props.age
        }
        const userId = this.props.user
        const studentId = this.props.studentId

        const updatedStudent = { firstName, lastName, gender, Class, age, userId, studentId }
        this.setState({ loading: true })
        this.props.editStudent(updatedStudent)
        if (this.props.success) {
            updateNotify('student')
        }
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
        const { firstName, lastName, Class, gender, age } = this.props
        return (<>

            <Button outline color="primary" onClick={this.toggle} >
                <AiOutlineEdit />
            </Button>

            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}><AiOutlineEdit /> Edit Student</ModalHeader>
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
                                defaultValue={firstName}
                                onChange={this.onChange} required />

                            <Label for="lastName">Last Name</Label>
                            <Input type="text"
                                name="lastName"
                                id="lastName"
                                placeholder="Add Last Name"
                                className="mb-3"
                                defaultValue={lastName}
                                onChange={this.onChange} required />

                            <Label for="Class" >Class</Label>
                            <Select name="Class" placeholder={Class} onChange={this.handleClasse}
                                options={this.props.classes} />

                            <Label for="gender">Gender</Label>
                            <Select name="gender" placeholder={gender} onChange={this.handleGender}
                                options={this.props.genders} />

                            <Label for="age">Birth Year</Label>
                            <Input type="number"
                                name="age"
                                id="age"
                                placeholder="Add the birth year"
                                className="mb-3"
                                defaultValue={age}
                                onChange={this.onChange} required />

                            <Button disabled={this.state.loading} type="submit" color="dark" style={{ marginTop: '2rem' }} block>
                                {this.state.loading ? 'Loading' : (<><AiOutlineEdit /> Edit</>)}
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
    classes: state.student.classes,
    networkError: state.auth.networkError
})

export default connect(mapStateToProps, { editStudent, clearErrors, clearSuccess })(EditStudentModal);
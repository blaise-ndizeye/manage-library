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
import { editTeacher, deleteSuccess } from '../actions/teacher/teacherAction'
import { clearErrors, clearSuccess } from '../actions/errorAction'
import { Redirect } from 'react-router-dom'
import Select from 'react-select'
import { AiOutlineEdit } from 'react-icons/ai'
import { updateNotify } from '../notification'

class EditTeacherModal extends Component {
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
        editTeacher: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {

        const { error, isAunthenticated, success, deleteSuccess } = this.props
        if (error !== prevProps.error) {
            if (error.id === 'EDIT_TEACHER_FAIL') {
                this.setState({
                    msg: error.msg.message
                })
            } else {
                this.setState({
                    msg: null,
                    firstName: '',
                    lastName: '',
                    gender: '',
                    phone: ''
                })
            }
        }
        if (this.state.modal) {
            if (!isAunthenticated) {
                return <Redirect to="/" />
            }
            else if (success) {
                updateNotify('teacher')
                this.toggle()
                deleteSuccess()
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
        let { firstName, lastName, gender, phone } = this.state
        if (!firstName) {
            firstName = this.props.firstName
        }
        if (!lastName) {
            lastName = this.props.lastName
        }
        if (!gender) {
            gender = this.props.gender
        }
        if (!phone) {
            phone = this.props.phone
        }
        const userId = this.props.user
        const teacherId = this.props.teacherId

        const updatedTeacher = { firstName, lastName, gender, phone, userId, teacherId }
        this.props.editTeacher(updatedTeacher)
    }
    handleGender = async (e) => {
        await this.setState({
            gender: e.value
        })
    }

    render() {
        const { firstName, lastName, gender, phone } = this.props
        return (<>

            <Button outline color="dark" onClick={this.toggle} >
                <AiOutlineEdit />
            </Button>

            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}><AiOutlineEdit /> Edit Teacher</ModalHeader>
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

                            <Label for="gender">Gender</Label>
                            <Select name="gender" placeholder={gender} onChange={this.handleGender}
                                options={this.props.genders} />

                            <Label for="phone">Phone number</Label>
                            <Input type="number"
                                name="phone"
                                id="phone"
                                placeholder="Add the phone number"
                                className="mb-3"
                                defaultValue={phone}
                                onChange={this.onChange} required />

                            <Button type="submit" color="dark" style={{ marginTop: '2rem' }} block>
                                <AiOutlineEdit /> Edit
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
    genders: state.student.genders
})

export default connect(mapStateToProps, { editTeacher, clearErrors, clearSuccess, deleteSuccess })(EditTeacherModal);
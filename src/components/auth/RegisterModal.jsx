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
import { register } from '../actions/auth/authActions'
import { clearErrors, clearSuccess } from '../actions/errorAction'
import { NavLink } from 'react-router-dom'
import { BsPersonPlusFill } from 'react-icons/bs'
import { networkErrorNotify, registerNotify } from '../notification'

class RegisterModal extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null,
        loading: false
    }

    static propTypes = {
        isAuthententicated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {

        const { error, success, networkError } = this.props
        if (networkError) return networkErrorNotify()
        if (error !== prevProps.error) {
            this.setState({ loading: true })
            if (error.id === 'REGISTER_FAIL') {
                this.setState({
                    msg: error.msg.message
                })
            } else {
                this.setState({
                    msg: null,
                    name: '',
                    email: '',
                    password: '',
                    password1: ''
                })
            }
        }
        if (this.state.modal) {
            if (success !== null) {
                this.toggle()
                this.props.clearSuccess()
                this.setState({
                    name: '',
                    email: '',
                    password1: '',
                    password: ''
                })
                registerNotify()
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

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault()
        const { name, email, password, password1 } = this.state
        const newUser = { name, email, password, password1 }
        this.setState({ loading: true })
        this.props.register(newUser)

    }

    render() {
        return (<>

            <NavLink className="nav-link" to="#" onClick={this.toggle} >
                Sign Up
        </NavLink>

            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}> <BsPersonPlusFill /> Sign Up</ModalHeader>
                <ModalBody>
                    {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="name">Username</Label>
                            <Input type="text"
                                name="name"
                                id="name"
                                placeholder="Add username"
                                className="mb-3"
                                onChange={this.onChange} required />

                            <Label for="email">Email</Label>
                            <Input type="email"
                                name="email"
                                id="email"
                                placeholder="Add email"
                                className="mb-3"
                                onChange={this.onChange} required />

                            <Label for="password">Password</Label>
                            <Input type="password"
                                name="password"
                                id="password"
                                placeholder="Add password"
                                className="mb-3"
                                onChange={this.onChange} required />

                            <Label for="password">Confirm Password</Label>
                            <Input type="password"
                                name="password1"
                                id="password1"
                                placeholder="Confirm password"
                                className="mb-3"
                                onChange={this.onChange} required />

                            <Button color="dark" style={{ marginTop: '2rem' }} block>
                                {this.state.loading ? 'Loading' : (
                                    <><BsPersonPlusFill /> Sign Up </>)}
                        </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>

        </>);
    }
}
const mapStateToProps = state => ({
    isAuthententicated: state.auth.isAuthententicated,
    error: state.error,
    success: state.auth.success,
    networkError: state.auth.networkError
})

export default connect(mapStateToProps, { register, clearErrors, clearSuccess })(RegisterModal);
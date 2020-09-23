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
import { NavLink, Redirect, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { checkPassword, clearConfirmation } from '../actions/auth/authActions'
import { clearErrors } from '../actions/errorAction'
import { GoUnverified } from 'react-icons/go'

class CheckPasswordModal extends Component {
    state = {
        modal: false,
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthententicated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        checkPassword: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, isAunthenticated, confirmation, clearConfirmation } = this.props
        if (error !== prevProps.error) {
            if (error.id === 'CHECK_PASSWORD_FAIL') {
                this.setState({
                    msg: error.msg.message
                })
            } else {
                this.setState({
                    msg: null,
                    password: ''
                })
            }
        }

        if (this.state.modal) {
            if (isAunthenticated) {
                if (confirmation) {
                    this.props.clearErrors()
                    this.toggle()
                    clearConfirmation()
                    this.props.history.push('/user/settings')
                }
            } else {
                return <Redirect to='/' />
            }
        }
    }

    toggle = () => {
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
        const { password } = this.state
        const { userId, email } = this.props
        const user = { email, password, userId }
        this.props.checkPassword(user)
    }

    render() {
        return (
            <>
                <NavLink className="nav-link" to="#" onClick={this.toggle}>
                    Settings
            </NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}><GoUnverified /> Verify Password</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password"
                                    name="password"
                                    id="password"
                                    placeholder="password"
                                    className="mb-3"
                                    onChange={this.onChange} required />

                                <Button color="dark" style={{ marginTop: '2rem' }} block>
                                    <GoUnverified /> Verify
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
    email: state.auth.user.email,
    userId: state.auth.user._id,
    confirmation: state.auth.checkPassword
})

export default connect(mapStateToProps, { checkPassword, clearErrors, clearConfirmation })(withRouter(CheckPasswordModal));
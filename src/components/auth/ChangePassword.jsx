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
import { changePassword, clearConfirmation } from '../actions/auth/authActions'
import { clearErrors } from '../actions/errorAction'
import { AiOutlineEdit } from 'react-icons/ai'
import { updateNotify, networkErrorNotify } from '../notification'

class ChangePasswordModal extends Component {
    state = {
        modal: false,
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthententicated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        changePassword: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, isAunthenticated, success, networkError } = this.props
        if (networkError) return networkErrorNotify()
        if (error !== prevProps.error) {

            if (error.id === 'CHANGE_PASSWORD_FAIL') {
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
                if (success) {
                    this.cleanModal()
                    this.toggle()
                    updateNotify('password')
                }
            }
        }
    }

    cleanModal = async () => {
        const { clearErrors, clearConfirmation } = this.props
        await clearErrors
        await clearConfirmation()
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
        if (this.props.networkError) return networkErrorNotify()
        const { password } = this.state
        const { userId } = this.props
        const user = { userId, password }
        this.props.changePassword(user)
    }

    render() {
        return (<>

            <Button outline color="primary" to="#" onClick={this.toggle} >
                <AiOutlineEdit /> Change Password
           </Button>

            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}><AiOutlineEdit /> Edit Password</ModalHeader>
                <ModalBody>
                    {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>

                            <Label for="password">Password</Label>
                            <Input type="password"
                                name="password"
                                id="password"
                                placeholder="new password"
                                className="mb-3"
                                onChange={this.onChange} required />

                            <Button color="dark" style={{ marginTop: '2rem' }} block>
                                <AiOutlineEdit /> Submit
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
    userId: state.auth.user._id,
    success: state.auth.success,
    networkError: state.auth.networkError
})

export default connect(mapStateToProps, { changePassword, clearConfirmation, clearErrors })(ChangePasswordModal);
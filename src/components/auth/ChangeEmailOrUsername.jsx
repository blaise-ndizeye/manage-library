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
import { changeEmailOrUsername, clearConfirmation } from '../actions/auth/authActions'
import { clearErrors } from '../actions/errorAction'
import { AiOutlineEdit } from 'react-icons/ai'
import { updateNotify , networkErrorNotify} from '../notification'

class ChangeEmailOrPasswordModal extends Component {
    state = {
        modal: false,
        username: '',
        email: '',
        msg: null,
        loading: false
    }

    static propTypes = {
        isAuthententicated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        changeEmailOrUsername: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, isAunthenticated, success, clearErrors, networkError } = this.props
        if (networkError) return networkErrorNotify()
        if (error !== prevProps.error) {

            this.setState({ loading: false })
            if (error.id === 'CHANGE_EMAILORUSERNAME_FAIL') {
                this.setState({
                    msg: error.msg.message
                })
            } else {
                this.setState({
                    msg: null,
                    username: '',
                    email: ''
                })
            }
        }

        if (this.state.modal) {
            if (isAunthenticated) {
                if (success) {
                    this.toggle()
                    clearErrors()
                    clearConfirmation()
                    updateNotify('email/username')
                }
            }
        }
    }

    toggle = () => {
        this.setState({ loading: false })
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
        let { username, email } = this.state
        if (!username) {
            username = this.props.name
        }
        if (!email) {
            email = this.props.email
        }
        const { userId } = this.props
        const user = { userId, username, email }
        this.setState({ loading: true })
        this.props.changeEmailOrUsername(user)
    }

    render() {
        return (<>

            <Button outline color="primary" to="#" onClick={this.toggle} >
                <AiOutlineEdit /> Change Username or Email
           </Button>

            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}><AiOutlineEdit /> Edit Username/Email</ModalHeader>
                <ModalBody>
                    {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>

                            <Label for="username">Username</Label>
                            <Input type="username"
                                name="username"
                                id="username"
                                placeholder="new username"
                                className="mb-3"
                                onChange={this.onChange} />
                            <Label for="email">Email</Label>
                            <Input type="email"
                                name="email"
                                id="email"
                                placeholder="new email"
                                className="mb-3"
                                onChange={this.onChange} />

                            <Button disabled={this.state.loading} color="dark" style={{ marginTop: '2rem' }} block>
                                {this.state.loading ? 'Loading' : (<><AiOutlineEdit /> Submit</>)}
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
    email: state.auth.user.email,
    name: state.auth.user.name,
    networkError: state.auth.networkError
})

export default connect(mapStateToProps, { changeEmailOrUsername, clearConfirmation, clearErrors })(ChangeEmailOrPasswordModal);
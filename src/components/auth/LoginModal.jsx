import React, { Component } from "react"
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { GoSignIn } from "react-icons/go"

import { login } from "../actions/auth/authActions"
import { clearErrors } from "../actions/errorAction"
import { NavLink, withRouter } from "react-router-dom"
import { networkErrorNotify } from "../notification"

class LoginModal extends Component {
  state = {
    modal: false,
    email: "",
    password: "",
    msg: null,
    loading: false,
  }

  static propTypes = {
    isAuthententicated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  }

  componentDidUpdate(prevProps) {
    const { error, networkError } = this.props
    if (networkError) return networkErrorNotify()

    if (error !== prevProps.error) {
      this.setState({ loading: false })
      if (error.id === "LOGIN_FAIL") {
        this.setState({
          msg: error.msg.message,
        })
      } else {
        this.setState({
          msg: null,
          email: "",
          password: "",
        })
      }
    }
  }

  toggle = () => {
    this.props.clearErrors()
    this.setState({ loading: false })
    this.setState({
      modal: !this.state.modal,
    })
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { email, password } = this.state
    const user = { email, password }
    this.setState({ loading: true })
    this.props.login(user)
    if (this.props.isAunthenticated) {
      this.toggle()
      this.props.history.push("/home")
    }
  }

  render() {
    return (
      <>
        <NavLink
          className="nav-link nav-link-light"
          to="#"
          onClick={this.toggle}
        >
          Login
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            <GoSignIn /> Login
          </ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="email"
                  className="mb-3"
                  onChange={this.onChange}
                  required
                />

                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  className="mb-3"
                  onChange={this.onChange}
                  required
                />

                <Button
                  disabled={this.state.loading}
                  color="dark"
                  style={{ marginTop: "2rem" }}
                  block
                >
                  {this.state.loading ? (
                    "Loading..."
                  ) : (
                    <>
                      <GoSignIn /> Login
                    </>
                  )}
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </>
    )
  }
}
const mapStateToProps = (state) => ({
  isAunthenticated: state.auth.isAunthenticated,
  error: state.error,
  networkError: state.auth.networkError,
})

export default connect(mapStateToProps, { login, clearErrors })(
  withRouter(LoginModal)
)

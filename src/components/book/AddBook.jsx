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
import { addBook, deleteSuccess } from '../actions/book/bookAction'
import { clearErrors, clearSuccess } from '../actions/errorAction'
import { Redirect } from 'react-router-dom'
import { BsPlusCircle, BsPlusCircleFill } from 'react-icons/bs'
import { addNotify, networkErrorNotify } from '../notification'

class AddBookModal extends Component {
    state = {
        modal: false,
        numOfBooks: '',
        typeOfBooks: '',
        msg: null,
        dropdownOpen: false,
        loading: false
    }

    static propTypes = {
        isAuthententicated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        addBook: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {

        const { error, isAunthenticated, success, deleteSuccess, networkError } = this.props
        if (networkError) {
            return networkErrorNotify()
        }
        if (error !== prevProps.error) {
            this.setState({ loading: false })
            if (error.id === 'ADD_BOOK_FAIL') {
                this.setState({
                    msg: error.msg.message
                })
            } else {
                this.setState({
                    msg: null,
                    numOfBooks: '',
                    typeOfBooks: ''
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
                addNotify('Books')
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

    onSubmit = e => {
        e.preventDefault()
        const { numOfBooks, typeOfBooks } = this.state
        const userId = this.props.user

        const newBook = { numOfBooks, typeOfBooks, userId }
        this.setState({ loading: true })
        this.props.addBook(newBook)
    }

    render() {
        return (<>

            <Button outline color="primary" onClick={this.toggle} >
                <BsPlusCircleFill /> Add books
        </Button>

            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}><BsPlusCircleFill /> Add Books</ModalHeader>
                <ModalBody>
                    {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="typeOfBooks">Type Of Books</Label>
                            <Input minLength="2" type="text"
                                name="typeOfBooks"
                                id="typeOfBooks"
                                placeholder="Add Books Type"
                                className="mb-3"
                                onChange={this.onChange} required />

                            <Label for="numOfBooks">Number Of Books</Label>
                            <Input type="number"
                                name="numOfBooks"
                                id="numOfBooks"
                                placeholder="Add the number of books"
                                className="mb-3"
                                onChange={this.onChange} required />

                            <Button disabled={this.state.loading} type="submit" color="dark" style={{ marginTop: '2rem' }} block>
                                {this.state.loading ? 'Loading' : (<><BsPlusCircle /> Add</>)}
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
    success: state.book.success,
    user: state.auth.user._id,
    networkError: state.auth.networkError
})

export default connect(mapStateToProps, { addBook, clearErrors, clearSuccess, deleteSuccess })(AddBookModal);
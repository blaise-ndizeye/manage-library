import React, { useState } from 'react';
import { Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import moment from 'moment'

const BookBorrowed = (props) => {
    const { date, numOfBooks, bookName, bookType } = props
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const toggle = () => setDropdownOpen(prevState => !prevState)
    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle outline color="info" caret>
                Borrowed Books Details
        </DropdownToggle>
            <DropdownMenu>
                <DropdownItem header>Date Borrowed: {moment(date).format('LL')}</DropdownItem>
                <DropdownItem header>Number Of Books: {numOfBooks}</DropdownItem>
                <DropdownItem header>Book Type: {bookType}</DropdownItem>
                <DropdownItem header>Book Name: {bookName}</DropdownItem>
            </DropdownMenu>
        </Dropdown>);
}

export default BookBorrowed;
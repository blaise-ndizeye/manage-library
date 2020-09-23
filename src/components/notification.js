import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

export const deleteAllNotify = data => {
    toast.warn(`${data} and related data deleted successfuly!!`)
}

export const addNotify = data => {
    toast.success(`${data} added successfully!!`)
}

export const lendNotify = data => {
    toast.info(`${data} lended successfully`)
}

export const deleteNotify = data => {
    toast.error(`${data} deleted successfully`)
}

export const logoutNotify = () => {
    toast('Logout successfully')
}

export const deleteAccountNotify = () => {
    toast.error('Account deleted successfully')
}

export const promoteNotify = () => {
    toast.success('Promoting students successfully')
}

export const loginNotify = () => {
    toast(`Logged in to 'Online Library Management System'`)
}

export const returnNotify = () => {
    toast.success('Returning books successfully')
}

export const updateNotify = data => {
    toast(`Updating ${data} successfully`)
}

export const registerNotify = () => {
    toast.success('You have been successfully registered')
}

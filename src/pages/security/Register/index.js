import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { LOGIN } from '../../../action-types'
import { AuthContext } from '../../../App'
import { apiUrl } from '../../../utils/api-url'

import '../styles.scss'

function Register() {

    const { dispatch } = React.useContext(AuthContext)
    const navigate = useNavigate()

    const initialState = {
        name: '',
        email: '',
        password: '',
        isSubmitting: false,
        errorMessage: null
    }

    const [data, setData] = React.useState(initialState)

    // Set all state data from state at once
    const handleInputChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const handleFormSubmit = () => {
        setData({
            ...data,
            isSubmitting: true,
            errorMessage: null
        })

        fetch(apiUrl('register'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                password: data.password
            })
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw response
            }
        }).then(data => {
            dispatch({
                type: LOGIN,
                payload: data
            })
            navigate('/home')
        }).catch(error => {
            console.error(error)

            setData({
                ...data,
                isSubmitting: false,
                errorMessage: 'Invalid credentials'
            })
        })
    }

    return (
        <div className="log-reg-container container">

            <div className='row'>
                <div className='col-12 title'>
                    <h2>Register</h2>
                    <div className='separator'></div>
                </div>
            </div>

            <label htmlFor="name">
                Name
                <input
                    type="text"
                    value={data.name}
                    onChange={handleInputChange}
                    name="name"
                    id="name"
                />
            </label>

            <label htmlFor="email">
                Email
                <input
                    type="text"
                    value={data.email}
                    onChange={handleInputChange}
                    name="email"
                    id="email"
                />
            </label>

            <label htmlFor="password">
                Password
                <input
                    type="password"
                    value={data.password}
                    onChange={handleInputChange}
                    name="password"
                    id="password"
                />
            </label>

            <button className='button primary-button' onClick={handleFormSubmit} disabled={data.isSubmitting}>
                {data.isSubmitting ? (
                    "Please wait..."
                ) : (
                    "Register"
                )}
            </button>

            {data.errorMessage && (
                <span className="form-error">{data.errorMessage}</span>
            )}
            <div className='text-center'>
                <p>Already have an account? <Link to="/login">Login</Link></p>
                <Link to="/">Back landing</Link>
            </div>
        </div>
    )
}

export default Register
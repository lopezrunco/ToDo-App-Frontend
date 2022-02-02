import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { LOGIN } from '../../../action-types'
import { AuthContext } from '../../../App'
import { apiUrl } from '../../../utils/api-url'

import '../styles.scss'

function Login() {

    const { dispatch } = React.useContext(AuthContext)
    const navigate = useNavigate()

    const initialState = {
        email: '',
        password: '',
        token: '',
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

        fetch(apiUrl('login'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
                token: data.token
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
                    <h2>Login</h2>
                    <div className='separator'></div>
                </div>
            </div>

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

            <label htmlFor="token">
                Token (Optional)
                <input
                    type="password"
                    value={data.token}
                    onChange={handleInputChange}
                    name="token"
                    id="token"
                />
            </label>

            {/* Si se estan enviando datos al servidor, se deshabilita el boton de ingresar y se muestra mensaje de espera */}
            <button className='button primary-button' onClick={handleFormSubmit} disabled={data.isSubmitting}>
                {data.isSubmitting ? (
                    "Please wait..."
                ) : (
                    "Login"
                )}
            </button>

            {/* Si hay mensajes de error, se muestran */}
            {data.errorMessage && (
                <span className="form-error">{data.errorMessage}</span>
            )}
            <div className='text-center'>
                <p>Don't you have an account? <Link to="/register">Register</Link></p>
                <Link to="/">Back to landing</Link>
            </div>
        </div>
    )
}

export default Login
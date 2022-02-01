import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { LOGIN } from '../../../action-types'
import { AuthContext } from '../../../App'
import { apiUrl } from '../../../utils/api-url'

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
        <div className="login-container">
            <div className="card">
                <div className="container">
                    <h1>Login</h1>

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
                        Token
                        <input
                            type="password"
                            value={data.token}
                            onChange={handleInputChange}
                            name="token"
                            id="token"
                        />
                    </label>

                    {/* Si se estan enviando datos al servidor, se deshabilita el boton de ingresar y se muestra mensaje de espera */}
                    <button onClick={handleFormSubmit} disabled={data.isSubmitting}>
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
                    <br />
                    <Link to="/register">Register</Link>
                    <br />
                    <Link to="/">Back to landing</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
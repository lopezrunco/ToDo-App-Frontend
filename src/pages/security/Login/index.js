import React, { useReducer } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiUrl } from '../../../utils/api-url'

const initialState = {
    email: '',
    password: '',
    token: '',
    isSubmitting: false,
    hasError: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'FORM_INPUT_CHANGE':
            return {
                ...state,
                [action.payload.input]:  action.payload.value
            }
        case 'LOGIN_REQUEST':
            return {
                ...state,
                isSubmitting: true,
                hasError: false
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isSubmitting: false,
                user: action.payload.user
            }
        case 'LOGIN_FAILURE':
            return {
                ...state,
                isSubmitting: false,
                hasError: true
            }
        default:
            return state
    }
}

function Login() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const navigate = useNavigate()

    const handleInputChange = event => {
        dispatch({
            type: 'FORM_INPUT_CHANGE',
            payload: {
                input: event.target.name,
                value: event.target.value
            }
        })
    }

    // Funcion que envia los datos a la API
    const handleFormSubmit = () => {
        dispatch({
            type: 'LOGIN_REQUEST'
        })

        fetch(apiUrl('login'), {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: state.email,
                password: state.password,
                token: state.token
            })
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw response
            }
        }).then(data => {
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: data
            })
            navigate('/home')

        }).catch(error => {
            dispatch({
                type: 'LOGIN_FAILURE'
            })
        })
    }

    return (
        <div className="login-container">
            <div className="card">
                <div className="container">
                    <form>
                        <h1>Inicio de sesión</h1>

                        <label htmlFor="email">
                            Email
                            <input
                                type="text"
                                value={state.email}
                                onChange={handleInputChange}
                                name="email"
                                id="email"
                            />
                        </label>

                        <label htmlFor="password">
                            Contraseña
                            <input
                                type="password"
                                value={state.password}
                                onChange={handleInputChange}
                                name="password"
                                id="password"
                            />
                        </label>

                        <label htmlFor="token">
                            Token
                            <input
                                type="password"
                                value={state.token}
                                onChange={handleInputChange}
                                name="token"
                                id="token"
                            />
                        </label>

                        {/* Si se estan enviando datos al servidor, se deshabilita el boton de ingresar y se muestra mensaje de espera */}
                        <button onClick={handleFormSubmit} disabled={state.isSubmitting}>
                            {state.isSubmitting ? (
                                "Espere..."
                            ) : (
                                "Ingresar"
                            )}
                        </button>
                    </form>

                    <br />
                    <Link to="/register">Registrarse</Link>
                    <br />
                    <Link to="/">Volver a landing</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App'

import './style.css'

// Funcion que maneja la concatenacion de la url con la que se hacen peticiones la API
import { apiUrl } from '../../utils/api-url'

function Register() {

    // Del contexto de autenticacion tomamos la funcion dispatch para indicar si ocurrio algun login
    const { dispatch } = React.useContext(AuthContext)

    // Funcionaidad de react router 6.0.2 para navegar de forma sencilla 
    // (Basicamente es una funcion que recibe un string que es la ruta)
    const navigate = useNavigate()

    // Declaracion del estado inicial del usuario (todo vacio)
    const initialState = {
        name: '',
        email: '',
        password: '',
        isSubmitting: false, // Indica si estan enviando datos o no, y de esa manera manejarlo en la UI
        errorMessage: null
    }

    // Seteo del estado inicial
    const [data, setData] = React.useState(initialState)

    // Funcion que actualiza todos los datos del estado de una sola vez (sin necesidad de hacerlo uno a uno)
    // Esta funcion se invoca en el onChange de los inputs
    const handleInputChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    // Funcion que envia los datos a la API
    const handleFormSubmit = event => {

        // Evita que el formulario redireccione
        event.preventDefault()

        // Setea isSubmitting en verdadero para que deshabilite el boton de envio
        // Setea errorMessage en nulo para que no se muestren mensajes de error durante la peticion (a nivel visual para no confundir al usuario)
        setData({
            ...data,
            isSubmitting: true,
            errorMessage: null
        })

        // Llamada al endpoint de registro
        fetch(apiUrl('registro'), {
            method: 'post',
            headers: {
                // Declara que tipo de contenido se le envia al backend, otra opcion podria ser XML
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
            // Si todo se ejecuto OK, hace un dispatch del register con los datos que vienen de la API
            dispatch({
                type: 'REGISTER',
                payload: data
            })

            // Luego de hacer el dispatch, navega a home
            navigate('/home')
        }).catch(error => {
            console.error(error)

            setData({
                ...data,
                isSubmitting: false,
                errorMessage: 'Error al registrarte, chequea tus datos'
            })
        })
    }

    return (
        <div className="register-container d-flex flex-column justify-content-center align-items-center">
            <div className="card p-5">
                <div className="container">
                    <form onSubmit={handleFormSubmit} className="d-flex flex-column justify-content-center align-items-center gap-2">
                        <h1>Regístrate</h1>

                        <label htmlFor="name">
                            Nombre
                            <input
                                type="text"
                                value={data.name}
                                onChange={handleInputChange}
                                name="name"
                                id="name"
                                placeholder="Ej: Juan Pereira"
                                className="form-control"
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
                                placeholder="Ej: juan@gmail.com"
                                className="form-control"
                            />
                        </label>

                        <label htmlFor="password">
                            Contraseña
                            <input
                                type="password"
                                value={data.password}
                                onChange={handleInputChange}
                                name="password"
                                id="password"
                                placeholder="Tu contraseña"
                                className="form-control"
                            />
                        </label>

                        {/* Si se estan enviando datos al servidor, se deshabilita el boton de ingresar y se muestra mensaje de espera */}
                        <button disabled={data.isSubmitting} className="btn btn-outline-secondary mt-3">
                            {data.isSubmitting ? (
                                "Espere..."
                            ) : (
                                "Registrarme"
                            )}
                        </button>

                        {/* Si hay mensajes de error, se muestran */}
                        {data.errorMessage && (
                            <span className="form-error alert alert-danger">{data.errorMessage}</span>
                        )}
                    </form>
                    <p className="switch-login-register-message mt-3 text-center">
                        Ya tienes tu cuenta? <a href="/login">Inicia sesión</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register
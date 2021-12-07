import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../App'
import { apiUrl } from '../../../utils/api-url'

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
    const handleFormSubmit = () => {

        // Setea isSubmitting en verdadero para que deshabilite el boton de envio
        // Setea errorMessage en nulo para que no se muestren mensajes de error durante la peticion (a nivel visual para no confundir al usuario)
        setData({
            ...data,
            isSubmitting: true,
            errorMessage: null
        })

        // Llamada al endpoint de login
        fetch(apiUrl('register'), {
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
            // Si todo se ejecuto OK, hace un dispatch de login con los datos que vienen de la API
            dispatch({
                type: 'LOGIN',
                payload: data
            })

            // Luego de hacer el dispatch, navega a home
            navigate('/home')
        }).catch(error => {
            console.error(error)

            setData({
                ...data,
                isSubmitting: false,
                errorMessage: 'Credenciales invalidas'
            })
        })
    }

    return (
        <div className="login-container">
            <div className="card">
                <div className="container">
                    <form>
                        <h1>Registro de nueva cuenta</h1>

                        <label htmlFor="name">
                            Nombre
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
                            Contraseña
                            <input
                                type="password"
                                value={data.password}
                                onChange={handleInputChange}
                                name="password"
                                id="password"
                            />
                        </label>

                        {/* Si se estan enviando datos al servidor, se deshabilita el boton de ingresar y se muestra mensaje de espera */}
                        <button onClick={handleFormSubmit} disabled={data.isSubmitting}>
                            {data.isSubmitting ? (
                                "Espere..."
                            ) : (
                                "Ingresar"
                            )}
                        </button>

                        {/* Si hay mensajes de error, se muestran */}
                        {data.errorMessage && (
                            <span className="form-error">{data.errorMessage}</span>
                        )}
                    </form>
                    <br />
                    <Link to="/login">Iniciar sesion</Link>
                    <br />
                    <Link to="/">Volver a landing</Link>
                </div>
            </div>
        </div>
    )
}

export default Register
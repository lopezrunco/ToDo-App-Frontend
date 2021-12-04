import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App'
import { apiUrl } from '../../utils/api-url'
import { refreshToken } from '../../utils/refresh-token'
import './style.scss'

function CreateTodo() {
    const { state: authState, dispatch: authDispatch } = React.useContext(AuthContext)
    const navigate = useNavigate()

    // Declaracion del estado inicial del usuario (todo vacio)
    const initialState = {
        email: '',
        password: '',
        token: '',
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

        // Setea isSubmitting en verdadero para que deshabilite el boton de envio
        // Setea errorMessage en nulo para que no se muestren mensajes de error durante la peticion (a nivel visual para no confundir al usuario)
        setData({
            ...data,
            isSubmitting: true,
            errorMessage: null
        })

        // Llamada al endpoint de todos
        fetch(apiUrl('todos'), {
            method: 'post',
            headers: {
                'Authorization': authState.token,
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
            navigate('/home')
        }).catch(error => {
            console.error('Error en crear todo', error)

            // Si da error 401, quiere decir que el token por algun motivo estaba mal
            if (error.status === 401) {

                // Funcion utilitaria para refrescar el token
                refreshToken(
                    authState.refreshToken,
                    authDispatch,
                    navigate,
                    () => handleFormSubmit()    // Si el refresh sale bien, intenta nuevamente hacer la peticion
                )
            } else if (error.status === 403) {
                navigate('/forbidden')
            } else {
                setData({
                    ...data,
                    isSubmitting: false,
                    errorMessage: error
                })
            }
        })
    }

    return (
        <div className="create-todo container">
            <div className="card">
                <div className="container">
                    <form>
                        <h1>Inicio de sesión</h1>

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

                        {/* Si se estan enviando datos al servidor, se deshabilita el boton y se muestra mensaje de espera */}
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
                    <Link to="/register">Registrarse</Link>
                    <br />
                    <Link to="/">Volver a landing</Link>
                </div>
            </div>
        </div>
    )
}

export default CreateTodo
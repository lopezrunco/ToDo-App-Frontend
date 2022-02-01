import React, { useReducer, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../App'
import { apiUrl } from '../../../utils/api-url'
import { refreshToken } from '../../../utils/refresh-token'
import './style.scss'

// Declaracion del estado inicial del usuario (todo vacio)
const initialState = {
    title: '',
    description: '',
    priority: '',
    isSending: false,
    hasError: false
}

const reducer = (state, action) => {
    switch (action.type) {
        // Modifica el estado al cambiar el estado del input
        case 'FORM_INPUT_CHANGE':
            return {
                ...state,
                // De forma dinamica, cambiara de un input puntual el valor que se le pase como parametro
                [action.payload.input]: action.payload.value
            }
        case 'CREATE_TODO_REQUEST':
            return {
                ...state,
                isSending: true,
                hasError: false
            }
        case 'CREATE_TODO_SUCCESS':
            return {
                ...state,
                isSending: false,
                todo: action.payload.todo
            }
        case 'CREATE_TODO_FAILURE':
            return {
                ...state,
                isSending: false,
                hasError: true
            }
        default:
            return state
    }
}

function CreateTodo() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { state: authState, dispatch: authDispatch } = useContext(AuthContext)
    const navigate = useNavigate()

    // Esta funcion se invoca en el onChange de los inputs
    const handleInputChange = (event) => {
        // Emision de dispatch que toma los valores del evento del formulario
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
            type: 'CREATE_TODO_REQUEST'
        })

        // Llamada al endpoint de todos
        fetch(apiUrl('todos'), {
            method: 'POST',
            headers: {
                'Authorization': authState.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: state.title,
                description: state.description,
                priority: state.priority,
                completed: false
            })
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw response
            }
        }).then(data => {
            dispatch({
                type: 'CREATE_TODO_SUCCESS',
                payload: data
            })

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
                dispatch({
                    type: 'CREATE_TODO_FAILURE'
                })
            }
        })
    }

    return (
        <div className="create-todo container">
            <div className="card">
                <div className="container">
                    <h1>Create todo</h1>

                    <label htmlFor="title">
                        Title
                        <input
                            type="text"
                            value={state.title}
                            onChange={handleInputChange}
                            name="title"
                            id="title"
                        />
                    </label>

                    <label htmlFor="description">
                        Description
                        <input
                            type="text"
                            value={state.description}
                            onChange={handleInputChange}
                            name="description"
                            id="description"
                        />
                    </label>

                    <label htmlFor="priority">
                        Priority
                        <input
                            type="text"
                            value={state.priority}
                            onChange={handleInputChange}
                            name="priority"
                            id="priority"
                        />
                    </label>

                    {/* Si se estan enviando datos al servidor, se deshabilita el boton y se muestra mensaje de espera */}
                    <button onClick={handleFormSubmit} disabled={state.isSubmitting}>
                        {state.isSubmitting ? (
                            "Espere..."
                        ) : (
                            "Ingresar"
                        )}
                    </button>

                    {/* Si hay mensajes de error, se muestran */}
                    {state.errorMessage && (
                        <span className="form-error">{state.errorMessage}</span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CreateTodo
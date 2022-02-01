import React, { useContext, useEffect, useReducer } from "react"
import { useNavigate, useParams } from "react-router" // useParams se usa para acceder a los parametros de la url
import { Link } from "react-router-dom"
import { HIDE_LOADER, SHOW_LOADER } from "../../../action-types"
import { AuthContext } from "../../../App"
import { apiUrl } from "../../../utils/api-url"
import { refreshToken } from "../../../utils/refresh-token"
import './style.scss'

// Valor por defecto del state
const initialState = {
    todos: undefined,
    isFetching: false,
    hasError: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_TODO_REQUEST':
            return {
                ...state,
                isFetching: true,
                hasError: false     // Se podria omitir esta linea, pero mejor dejarlo para limpiar posibles errores anteriores 
            }
        case 'FETCH_TODO_SUCCESS':
            return {
                ...state,
                isFetching: false,
                todo: action.payload.todo   // De la API viene el payload con la tarea solicitada
            }
        case 'FETCH_TODO_FAILURE':
            return {
                ...state,
                isFetching: false,
                hasError: true
            }
        default:
            return state
    }
}

function ViewTodo() {
    const navigate = useNavigate()
    const { id } = useParams()  // De los parametros toma el id
    const [state, dispacth] = useReducer(reducer, initialState) // Uso del reducer de este archivo
    const { state: authState, dispatch: authDispatch } = useContext(AuthContext)    //Uso del reducer de app.js. Toma el contexto de autenticacion para obtener por ejemplo un token. Y toma el dispatch para disparar acciones

    useEffect(() => {
        authDispatch({
            type: SHOW_LOADER
        })

        dispacth({
            type: 'FETCH_TODO_REQUEST'
        })

        // Peticion a la api de la tarea con el id actual
        fetch(apiUrl(`todos/${id}`), {
            headers: {
                'Authorization': authState.token,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw response
            }
        }).then(data => {
            // Si salio todo ok, actualiza el state emitiendo un dispatch de tipo success
            dispacth({
                type: 'FETCH_TODO_SUCCESS',
                payload: data
            })
        }).catch(error => {
            console.error('Error en fetch del todo', error)

            if (error.status === 401) {
                // Refrescar el toquen
                refreshToken(
                    authState.refreshToken,
                    authDispatch,
                    navigate
                )
            } else if (error.state === 403) {
                // Navegar a forbidden page
                navigate('/forbidden')
            } else {
                // Notifico el error al usuario emitiendo dispatch de tipo error
                dispacth({
                    type: 'FETCH_TODO_FAILURE'
                })
            }
            // Finally ejecuta un codigo una vez terminado el try/catch, independientemente de lo que haya pasado en la ejecucion
        }).finally(() => {
            authDispatch({
                type: HIDE_LOADER
            })
        })
    }, [id, authDispatch, authState.token, authState.refreshToken, navigate])   // Cuando cambien estos valores de redispara el hook

    return (
        <div className="view-todo container">
            <div className="card">
                <div className="container">

                    {state.todo && (
                        <>
                            <h2>Titulo: {state.todo.title}</h2>
                            <p>ID: {id}</p>
                            <p>Description: {state.todo.description}</p>
                            <p>Priority: {state.todo.priority}</p>
                        </>
                    )}

                    {state.hasError && (
                        <p>Ocurrio un error al obtener el todo</p>
                    )}

                    <Link to="/home">Volver a home</Link>
                </div>
            </div>
        </div>
    )
}

export default ViewTodo
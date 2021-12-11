import './style.scss'
import React, { useContext, useEffect, useReducer, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus } from 'react-bootstrap-icons'
import Skeleton from 'react-loading-skeleton'
import { AuthContext } from '../../App'
import { apiUrl } from '../../utils/api-url'
import { refreshToken } from '../../utils/refresh-token'
import Card from './components/Card'
import { FETCH_TODOS_FAILURE, FETCH_TODOS_REQUEST, FETCH_TODOS_SUCCESS } from './action-types'
import { ALL, DAY, HIGH_PRIORITY } from './filters'
import { HIDE_LOADER, SHOW_LOADER } from '../../action-types'

// Creacion de contexto para las todos. Se lo expone para que puedas ser usado en otros componentes
export const TodosContext = createContext()

// Estado inicial del componente
const initialState = {
    todos: [],
    isFetching: false,
    hasError: false
}

// Manejo de estados con un reducer
const reducer = (state, action) => {
    switch (action.type) {
        // Lanzamiento de fetch para los todos
        case FETCH_TODOS_REQUEST:
            return {
                ...state,
                isFetching: true,
                hasError: false
            }
        // Fetch exitoso
        case FETCH_TODOS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                todos: action.payload.todos // Setea los todos que llegaron en la peticion
            }
        // Fetch fallido
        case FETCH_TODOS_FAILURE:
            return {
                ...state,
                hasError: true,     // Hubo error
                isFetching: false
            }
        // Tarea eliminada
        case 'TODO_DELETED':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload.id)    // Indica que tarea se elimina del listado de tareas
            }
        default:
            return state
    }
}

function Home() {
    // Acceder al useNavigate
    const navigate = useNavigate()
    // Se usa el contexto de autenticacion para acceder al toquen con el que se solicitan las todos
    const { state: authState, dispatch: authDispatch } = useContext(AuthContext)
    // Hook de reducer con el estado inicial
    // Deja disponible el dispatch para avisar al reducer si se disparo una accion
    // Deja disponible el estado para usarlo en el componente para mostrar las todos
    const [state, dispatch] = useReducer(reducer, initialState)

    const search = () => { }

    const applyFilter = () => { }

    // Cuando se carga el componente obtiene los todos y los muestra (o al menos la primer pagina)
    useEffect(() => {

        // Si tiene token se hace la peticion de todos
        if (authState.token) {
            authDispatch({
                type: SHOW_LOADER
            })

            dispatch({
                type: FETCH_TODOS_REQUEST
            })

            // Peticion de las todos
            fetch(apiUrl('todos'), {
                headers: {
                    'Authorization': authState.token, // Importante pasar el token
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw response
                }
            }).then(data => {
                dispatch({
                    // Si salio todo OK, se hace un dispatch de tipo success con las todos que vinieron
                    type: FETCH_TODOS_SUCCESS,
                    payload: data // Este data tiene los todos
                })
            }).catch(error => {
                console.error('Error en el fetch de todos', error)

                // Si da error 401, quiere decir que el token por algun motivo estaba mal
                if (error.status === 401) {

                    // Funcion utilitaria para refrescar el token
                    refreshToken(
                        authState.refreshToken,
                        authDispatch,
                        navigate
                    )

                } else if (error.status === 403) {
                    navigate('/forbidden')
                } else {
                    dispatch({
                        type: FETCH_TODOS_FAILURE
                    })
                }
            }).finally(() => {
                authDispatch({
                    type: HIDE_LOADER
                })
            })
        }
    }, [authDispatch, authState.token, authState.refreshToken, navigate])   // El useEffect se volvera a disparar si el valor de alguna de estas dependencias cambia

    return (
        // Todos los elementos que se renderizan dentro de Home tienen acceso al contexto de todos. Puntualmente al state y dispatch
        <TodosContext.Provider value={{ state, dispatch }}>
            <main className="page-home container mb-5">
                <div className="bg-light p-4 rounded">
                    <div className="input-group mb-4">
                        <input id="search-keywords" type="text" className="form-control" placeholder="Terminos de busqueda ..." />
                        <button className="btn btn-secondary" type="button" onClick={search}>Buscar</button>
                    </div>

                    <ul className="nav nav-pills nav-fill mb-4">
                        <li className="nav-item">
                            <button className="nav-link" onClick={() => applyFilter(DAY)}>Mi día</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link" onClick={() => applyFilter(HIGH_PRIORITY)}>Importantes</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link active" onClick={() => applyFilter(ALL)}>Todas</button>
                        </li>
                    </ul>

                    <div id="todos-container" className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {state.isFetching ? (
                            <>
                                <div className="todo-card col">
                                    <div className="card">
                                        <div className="card-body">
                                            <Skeleton height={30} />
                                            <Skeleton count={4} />
                                        </div>
                                    </div>
                                </div>

                                <div className="todo-card col">
                                    <div className="card">
                                        <div className="card-body">
                                            <Skeleton height={30} />
                                            <Skeleton count={4} />
                                        </div>
                                    </div>
                                </div>

                                <div className="todo-card col">
                                    <div className="card">
                                        <div className="card-body">
                                            <Skeleton height={30} />
                                            <Skeleton count={4} />
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : state.hasError ? (
                            <span className="error">Ocurrió un error</span>
                        ) : (
                            <>
                                {/* Si hay tareas, mapea el array de tareas y genera un componente card por cada una */}
                                {state.todos.length > 0 ? (
                                    state.todos.map(todo => (
                                        // Key se utiliza para facilitar el renderizado de elementos (al reordenar o volver a dibujar los elementos por ejemplo)
                                        <Card key={todo.id} todo={todo} />
                                    ))
                                ) : (
                                    <div id="create-new-todo-hint">
                                        <p>
                                            Aun no hay tareas creadas :(
                                        </p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                <button
                    className="fab fab-fixed d-flex justify-content-center align-items-center bg-success"
                    onClick={() => navigate('/todos/create')}
                >
                    <Plus color="white" size={30} />
                </button>
            </main>
        </TodosContext.Provider>
    )
}

export default Home
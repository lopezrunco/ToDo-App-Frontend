import './style.scss'
import React from 'react'
import { Plus } from 'react-bootstrap-icons'
import { AuthContext } from '../../App'
import Card from './components/Card'
import { apiUrl } from '../../utils/api-url'
import { refreshToken } from '../../utils/refresh-token'

// Funcionalidad para navegar entre paginas de forma programatica (o sea sin que el usuario lo haga directamente)
import { useNavigate } from 'react-router-dom'

// Creacion de contexto de tareas
export const TodoContext = React.createContext()

// Creacion de elemento con filtros de categorias
// La funcion freeze() congela los valores para que sean solo de lectura y no se modifiquen
const filters = Object.freeze({
    ALL: 'ALL',
    DAY: 'DAY',
    HIGH_PRIORITY: 'HIGH_PRIORITY'
})

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
        case 'FETCH_TODOS_REQUEST':
            return {
                ...state,
                isFetching: true,
                hasError: false
            }
        // Fetch exitoso
        case 'FETCH_TODOS_SUCCESS':
            return {
                ...state,
                isFetching: false,
                todos: action.payload.todos // Setea los todos que llegaron en la peticion
            }
        // Fetch fallido
        case 'FETCH_TODOS_FAILURE':
            return {
                ...state,
                hasError: true,     // Hubo error
                isFetching: false
            }
        default:
            return state
    }
}

function Home() {
    // Acceder al useNavigate
    const navigate = useNavigate()
    // Se usa el contexto de autenticacion para acceder al toquen con el que se solicitan las todos
    const { state: authState, dispatch: authDispatch } = React.useContext(AuthContext)
    // Hook de reducer con el estado inicial
    // Deja disponible el dispatch para avisar al reducer si se disparo una accion
    // Deja disponible el estado para usarlo en el componente para mostrar las todos
    const [state, dispatch] = React.useReducer(reducer, initialState)

    const search = () => { }

    const applyFilter = () => { }

    // Cuando se carga el componente obtiene los todos y los muestra (o al menos la primer pagina)
    React.useEffect(() => {

        // Si tiene token se hace la peticion de todos
        if (authState.token) {
            dispatch({
                type: 'FETCH_TODOS_REQUEST'
            })

            // Peticion de las todos
            fetch(apiUrl('todos'), {
                headers: {
                    'Authorization': authState.token, // Importante pasar el token
                    'Content-Type': 'application/json'
                },
            }).then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw response
                }
            }).then(data => {
                dispatch({
                    // Si salio todo OK, se hace un dispatch de tipo success con las todos que vinieron
                    type: 'FETCH_TODOS_SUCCESS',
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
                        navigate,
                        // Pasamos una funcion para ejecutar cuando el refresh salio OK
                        () => {}
                    )

                } else if (error.status === 403) {
                    navigate('/forbidden')
                } else {
                    dispatch({
                        type: 'FETCH_TODOS_FAILURE'
                    })
                }
            })
        }
    }, [authDispatch, authState.token, authState.refreshToken, navigate])   // El useEffect se volvera a disparar si el valor de alguna de estas dependencias cambia

    return (
        <main className="page-home container mb-5">
            <div className="bg-light p-4 rounded">
                <div className="input-group mb-4">
                    <input id="search-keywords" type="text" className="form-control" placeholder="Terminos de busqueda ..." />
                    <button className="btn btn-secondary" type="button" onClick={search}>Buscar</button>
                </div>

                <ul className="nav nav-pills nav-fill mb-4">
                    <li className="nav-item">
                        <button className="nav-link" onClick={() => applyFilter(filters.DAY)}>Mi día</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link" onClick={() => applyFilter(filters.HIGH_PRIORITY)}>Importantes</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link active" onClick={() => applyFilter(filters.ALL)}>Todas</button>
                    </li>
                </ul>

                <div id="todos-container" className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {/* Ternario: si se esta haciendo la peticion, muestra Cargando...
                        si no hace otro ternario que muestra error o muestra las tareas  */}
                    {state.isFetching ? (
                        <span className="loader">Cargando...</span>
                    ) : state.hasError ? (
                        <span className="error">Ocurrió un error</span>
                    ) : (
                        <>
                            {/* Si hay tareas, mapea el array de tareas y genera un componente card por cada una */}
                            {state.todos.length > 0 &&
                                state.todos.map(todo => (
                                    // Key se utiliza para facilitar el renderizado de elementos (al reordenar o volver a dibujar los elementos por ejemplo)
                                    <Card key={todo.id} todo={todo} />
                                ))
                            }
                        </>
                    )}
                </div>

                <div id="create-new-todo-hint" className="d-none">
                    <p>
                        Aun no hay tareas creadas :(
                    </p>
                </div>
            </div>

            <button
                className="fab fab-fixed d-flex justify-content-center align-items-center bg-success"
                onClick={() => console.log('Open todo creator')}
            >
                <Plus color="white" size={30} />
            </button>
        </main>
    )
}

export default Home
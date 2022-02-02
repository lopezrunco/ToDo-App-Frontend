import React, { useContext, useEffect, useReducer, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus } from 'react-bootstrap-icons'
import Skeleton from 'react-loading-skeleton'

import { AuthContext } from '../../App'
import { apiUrl } from '../../utils/api-url'
import { refreshToken } from '../../utils/refresh-token'
import { FETCH_TODOS_FAILURE, FETCH_TODOS_REQUEST, FETCH_TODOS_SUCCESS } from './action-types'
import { ALL, DAY, HIGH_PRIORITY } from './filters'
import { HIDE_LOADER, SHOW_LOADER } from '../../action-types'

import Card from './components/Card'

import './style.scss'

export const TodosContext = createContext()

const initialState = {
    todos: [],
    isFetching: false,
    hasError: false
}

// Todos reducer
const reducer = (state, action) => {
    switch (action.type) {
        case FETCH_TODOS_REQUEST:
            return {
                ...state,
                isFetching: true,
                hasError: false
            }
        case FETCH_TODOS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                todos: action.payload.todos // Sets the todos
            }
        case FETCH_TODOS_FAILURE:
            return {
                ...state,
                hasError: true,
                isFetching: false
            }
        case 'TODO_DELETED':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload.id)    // Indicates the todo to delete from the list
            }
        default:
            return state
    }
}

function Home() {
    const navigate = useNavigate()
    const { state: authState, dispatch: authDispatch } = useContext(AuthContext)
    const [state, dispatch] = useReducer(reducer, initialState)

    // const search = () => { }

    // const applyFilter = () => { }

    // On component mount, fetch and render the todos
    useEffect(() => {

        // Athentication needed to fetch the todos
        if (authState.token) {
            authDispatch({
                type: SHOW_LOADER
            })

            dispatch({
                type: FETCH_TODOS_REQUEST
            })

            fetch(apiUrl('todos'), {
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
                dispatch({
                    type: FETCH_TODOS_SUCCESS,
                    payload: data
                })
            }).catch(error => {
                console.error('Error fetching the todos', error)

                if (error.status === 401) {

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
    }, [authDispatch, authState.token, authState.refreshToken, navigate])

    return (
        // All children elements of home has access to the todo context, specifically to the state and dispatch
        <TodosContext.Provider value={{ state, dispatch }}>
            <main className="page-home container mb-5">
                <div className="bg-light rounded">

                    <div className='row'>
                        <div className='col-12 title'>
                            <h2>My tasks</h2>
                            <div className='separator'></div>
                        </div>
                    </div>

                    {/* <div className="input-group mb-4">
                        <input id="search-keywords" type="text" className="form-control" placeholder="Write your task ..." />
                        <button className="btn btn-secondary" type="button" onClick={search}>Search</button>
                    </div> */}

                    {/* <ul className="nav nav-pills nav-fill mb-4">
                        <li className="nav-item">
                            <button className="nav-link" onClick={() => applyFilter(HIGH)}>High</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link" onClick={() => applyFilter(MEDIUM)}>Medium</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link active" onClick={() => applyFilter(LOW)}>Low</button>
                        </li>
                    </ul> */}

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
                            <span className="error">An error ocurred</span>
                        ) : (
                            <>
                                {state.todos.length > 0 ? (
                                    state.todos.map(todo => (
                                        <Card key={todo.id} todo={todo} />
                                    ))
                                ) : (
                                    <div id="create-new-todo-hint">
                                        <p>
                                            No tasks yet! :(
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
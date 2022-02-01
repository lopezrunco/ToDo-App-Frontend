import React, { useContext, useEffect, useReducer } from "react"
import { useNavigate, useParams } from "react-router"
import { Link } from "react-router-dom"

import { HIDE_LOADER, SHOW_LOADER } from "../../../action-types"
import { AuthContext } from "../../../App"
import { apiUrl } from "../../../utils/api-url"
import { refreshToken } from "../../../utils/refresh-token"

import './style.scss'

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
                hasError: false 
            }
        case 'FETCH_TODO_SUCCESS':
            return {
                ...state,
                isFetching: false,
                todo: action.payload.todo
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
    const { id } = useParams()
    const [state, dispacth] = useReducer(reducer, initialState)
    const { state: authState, dispatch: authDispatch } = useContext(AuthContext)

    useEffect(() => {
        authDispatch({
            type: SHOW_LOADER
        })

        dispacth({
            type: 'FETCH_TODO_REQUEST'
        })

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
            dispacth({
                type: 'FETCH_TODO_SUCCESS',
                payload: data
            })
        }).catch(error => {
            console.error('Error fetching todo', error)

            if (error.status === 401) {
                refreshToken(
                    authState.refreshToken,
                    authDispatch,
                    navigate
                )
            } else if (error.state === 403) {
                navigate('/forbidden')
            } else {
                dispacth({
                    type: 'FETCH_TODO_FAILURE'
                })
            }
        }).finally(() => {
            authDispatch({
                type: HIDE_LOADER
            })
        })
    }, [id, authDispatch, authState.token, authState.refreshToken, navigate])

    return (
        <div className="view-todo container">
            <div className="card">
                <div className="container">

                    {state.todo && (
                        <>
                            <h2>Title: {state.todo.title}</h2>
                            <p>ID: {id}</p>
                            <p>Description: {state.todo.description}</p>
                            <p>Priority: {state.todo.priority}</p>
                        </>
                    )}

                    {state.hasError && (
                        <p>Error obtaining the todo</p>
                    )}

                    <Link to="/home">Back to home</Link>
                </div>
            </div>
        </div>
    )
}

export default ViewTodo
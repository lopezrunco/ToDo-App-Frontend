import React, { useContext } from 'react'
import { Eye, Trash, Circle, CircleFill } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router'

import { AuthContext } from '../../../../App'
import { TodosContext } from '../..'
import { apiUrl } from '../../../../utils/api-url'
import { refreshToken } from '../../../../utils/refresh-token'
import { TODO_DELETED } from '../../action-types'

import './style.scss'

function Card({ todo }) {
    const navigate = useNavigate()
    const { state: authState, dispatch: authDispatch } = useContext(AuthContext)
    const { state: todosState, dispatch: todosDispatch } = useContext(TodosContext)

    const toggleTodoCompletion = () => {
        fetch(apiUrl(`/todos/${todo.id}/toggle-complete`), {
            method: 'PATCH',
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
            // TODO: handle success case
            // update state by dispatch to the parent context
            alert(`Task is: ${todo.completed ? 'finished' : 'unfinished'}`)
        }).catch(error => {
            console.error('Error trying to update the todo', error)

            if (error.status === 401) {
                refreshToken(
                    authState.refreshToken,
                    authDispatch,
                    navigate,
                    () => toggleTodoCompletion
                )
            } else if (error.status === 403) {
                navigate('./forbidden')
            } else {
                alert('Error trying to update the todo')
            }
        })
    }

    const viewTodo = () => {
        navigate(`/todos/${todo.id}`)
    }

    const deleteTodo = () => {
        fetch(apiUrl(`/todos/${todo.id}`), {
            method: 'DELETE',
            headers: {
                'Authorization': authState.token,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                return
            } else {
                throw response
            }
        }).then(() => {
            alert('Todo deleted!')
            todosDispatch({
                type: TODO_DELETED,
                payload: {
                    id: todo.id     // Update the home reducer, indicating the todo to delete
                }
            })
        }).catch(error => {
            console.error('Error trying to delete the todo', error)

            if (error.status === 401) {
                refreshToken(
                    authState.refreshToken,
                    authDispatch,
                    navigate,
                    () => deleteTodo
                )
            } else if (error.status === 403) {
                navigate('./forbidden')
            } else {
                alert('Error trying to delete the todo')
            }
        })
    }

    return (
        <div className="todo-card col">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">{todo.title}</h4>
                    <p className="card-text">{todo.description}</p>
                </div>

                <div className="card-floating-actions d-flex">
                    <button
                        type="button"
                        className="btn-change-todo-status fab fab-mini me-2 d-flex justify-content-center align-items-center bg-primary"
                        onClick={toggleTodoCompletion}
                    >
                        {todo.completed ? (
                            <CircleFill color="white" />
                        ) : (
                            <Circle color="white" />
                        )}
                    </button>

                    <button
                        type="button"
                        className="btn-view-todo fab fab-mini me-2 d-flex justify-content-center align-items-center bg-info"
                        onClick={viewTodo}
                    >
                        <Eye color="white" />
                    </button>

                    <button
                        type="button"
                        className="btn-delete-todo fab fab-mini me-2 d-flex justify-content-center align-items-center bg-danger"
                        onClick={deleteTodo}
                    >
                        <Trash color="white" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card
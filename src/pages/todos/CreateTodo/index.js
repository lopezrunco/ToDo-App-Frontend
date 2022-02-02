import React, { useReducer, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../../../App'
import { apiUrl } from '../../../utils/api-url'
import { refreshToken } from '../../../utils/refresh-token'

import './style.scss'

const initialState = {
    title: '',
    description: '',
    priority: '',
    isSending: false,
    hasError: false
}

const reducer = (state, action) => {
    switch (action.type) {
        // Update state on input change
        case 'FORM_INPUT_CHANGE':
            return {
                ...state,
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

    const handleInputChange = (event) => {
        dispatch({
            type: 'FORM_INPUT_CHANGE',
            payload: {
                input: event.target.name,
                value: event.target.value
            }
        })
    }

    const handleFormSubmit = () => {
        dispatch({
            type: 'CREATE_TODO_REQUEST'
        })

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

            if (error.status === 401) {
                refreshToken(
                    authState.refreshToken,
                    authDispatch,
                    navigate,
                    () => handleFormSubmit()
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

            <div className='row'>
                <div className='col-12 title'>
                    <h2>Create todo</h2>
                    <div className='separator'></div>
                </div>
            </div>

            <div className="card">
                <div className="container create-todo-container p-5">

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

                    <button className='button primary-button' onClick={handleFormSubmit} disabled={state.isSubmitting}>
                        {state.isSubmitting ? (
                            "Please wait..."
                        ) : (
                            "Create"
                        )}
                    </button>

                    {state.errorMessage && (
                        <span className="form-error">{state.errorMessage}</span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CreateTodo
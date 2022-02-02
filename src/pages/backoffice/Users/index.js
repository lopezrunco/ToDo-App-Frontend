import { useContext, useEffect, useReducer } from 'react'

import { FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS } from './action-types'
import { refreshToken } from '../../../utils/refresh-token'
import { apiUrl } from '../../../utils/api-url'
import { AuthContext } from '../../../App'
import { HIDE_LOADER, SHOW_LOADER } from '../../../action-types'
import { useNavigate } from 'react-router-dom'

const initialState = {
    users: [],
    isFetching: false,
    hasError: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                isFetching: true,
                hasError: false
            }
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                users: action.payload.users
            }
        case FETCH_USERS_FAILURE:
            return {
                ...state,
                hasError: true,
                isFetching: false
            }
        default:
            return state
    }
}

function Users() {

    const { state: authState, dispatch: authDispatch } = useContext(AuthContext)
    const [state, dispatch] = useReducer(reducer, initialState)
    const navigate = useNavigate()

    useEffect(() => {
        if (authState.token) {
            authDispatch({
                type: SHOW_LOADER
            })

            dispatch({
                type: FETCH_USERS_REQUEST
            })

            fetch(apiUrl('admin/users'), {
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
                    type: FETCH_USERS_SUCCESS,
                    payload: data
                })
            }).catch(error => {
                console.error('Error fetching the users', error)

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
                        type: FETCH_USERS_FAILURE
                    })
                }
            }).finally(() => {
                authDispatch({
                    type: HIDE_LOADER
                })
            })
        }
    }, [authDispatch, authState.token, authState.refreshToken])

    return (
        <main className='list-users container'>

            <div className='row'>
                <div className='col-12 title'>
                    <h2>Users</h2>
                    <div className='separator'></div>
                    {!state.hasError && (
                        <div className='count-info'>
                            <small>Users registered: {state.users.length}</small>
                        </div>
                    )}
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className='row'>
                        {state.isFetching ? (
                            <p>Loading</p>
                        ) : state.hasError ? (
                            <p>Error obtaining the users</p>
                        ) : (
                            <>
                                {state.users.length > 0 ? (
                                    state.users.map(user => (
                                        <div className='col-md-6 mb-3'>
                                            <ul className='list-group'>
                                                <li className='list-group-item'><strong>ID:</strong> {user.id}</li>
                                                <li className='list-group-item'><strong>Name:</strong> {user.name}</li>
                                                <li className='list-group-item'><strong>Email:</strong> {user.email}</li>
                                                <li className='list-group-item'><strong>Role:</strong> {user.role}</li>
                                                <li className='list-group-item'><strong>MFA enabled:</strong> {user.mfaEnabled ? 'Yes' : 'No'}</li>
                                            </ul>
                                        </div>

                                    ))
                                ) : (
                                    <p>No users</p>
                                )}
                            </>
                        )}
                    </div>
                </div>

            </div>
        </main>
    )
}

export default Users
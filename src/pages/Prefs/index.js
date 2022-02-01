import React, { useReducer, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { ENABLE_MFA, HIDE_LOADER, SHOW_LOADER } from '../../action-types'
import { AuthContext } from '../../App'
import { apiUrl } from '../../utils/api-url'
import { refreshToken } from '../../utils/refresh-token'
import { ENABLE_MFA_FAILURE, ENABLE_MFA_REQUEST, ENABLE_MFA_SUCCESS } from './action-types'

const initialState = {
    mfa: undefined,
    isSending: false,
    hasError: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case ENABLE_MFA_REQUEST:
            return {
                ...state,
                isSending: true,
                hasError: false
            }
        case ENABLE_MFA_SUCCESS:
            return {
                ...state,
                isSending: false,
                mfa: action.payload
            }
        case ENABLE_MFA_FAILURE:
            return {
                ...state,
                isSending: false,
                hasError: true
            }
        default:
            return state
    }
}

function Prefs() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { state: authState, dispatch: authDispatch } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleEnableMfa = () => {
        dispatch({
            type: SHOW_LOADER
        })

        dispatch({
            type: ENABLE_MFA_REQUEST
        })

        fetch(apiUrl('auth/mfa'), {
            method: 'GET',
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
                type: ENABLE_MFA_SUCCESS,
                payload: data
            })

            dispatch({
                type: ENABLE_MFA
            })
        }).catch(error => {
            console.error('Error trying to enable MFA', error)

            if (error.status === 401) {
                refreshToken(
                    authState.refreshToken,
                    authDispatch,
                    navigate,
                    () => handleEnableMfa()
                )
            } else if (error.status === 403) {
                navigate('/forbidden')
            } else {
                dispatch({
                    type: ENABLE_MFA_FAILURE
                })
            }
        }).finally(() => {
            authDispatch({
                type: HIDE_LOADER
            })
        })
    }

    return (
        <div className="page-prefs container">
            <h2>Preferences</h2>

            <h3>Security</h3>
            <h4>MFA</h4>

            {/* If the user already has MFA enabled, the button will be disabled */}
            <button onClick={handleEnableMfa} disabled={authState.user.mfaEnabled}>Enable MFA</button>
            {
                state.mfa &&
                <>
                    <p>Secret key: {state.mfa.secret}</p>
                    <img src={state.mfa.qr} />
                </>
            }
        </div>
    )
}

export default Prefs
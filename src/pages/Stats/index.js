import React, { useEffect, useContext, useReducer } from 'react'
import { LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

import { apiUrl } from '../../utils/api-url'
import { AuthContext } from '../../App'
import {
    FETCH_LOGINS_IN_OVER_TIME_FAILURE,
    FETCH_LOGINS_IN_OVER_TIME_REQUEST,
    FETCH_LOGINS_IN_OVER_TIME_SUCCESS,
    FETCH_REGISTERS_IN_OVER_TIME_REQUEST,
    FETCH_REGISTERS_IN_OVER_TIME_SUCCESS,
    FETCH_REGISTERS_IN_OVER_TIME_FAILURE,
    FETCH_GROUPED_EVENTS_REQUEST,
    FETCH_GROUPED_EVENTS_SUCCESS,
    FETCH_GROUPED_EVENTS_FAILURE
} from './action-types'

const initialState = {
    loginsInTime: [],
    loginsOverTime: [],
    registersInTime: [],
    registersOverTime: [],
    groupedEvents: []
}

const reducer = (state, action) => {
    switch (action.type) {
        case FETCH_LOGINS_IN_OVER_TIME_REQUEST:
            return {
                ...state,
                isFetching: true,
                hasError: false
            }
        case FETCH_LOGINS_IN_OVER_TIME_SUCCESS:
            // Separate data for better handling in the charts
            const loginsInTime = action.payload.events.map(event => {
                return {
                    date: event.date,
                    inTime: event.inTime
                }
            })
            const loginsOverTime = action.payload.events.map(event => {
                return {
                    date: event.date,
                    overTime: event.overTime
                }
            })

            return {
                ...state,
                isFetching: false,
                loginsInTime,
                loginsOverTime
            }
        case FETCH_REGISTERS_IN_OVER_TIME_FAILURE:
            return {
                ...state,
                hasError: true,
                isFetching: false
            }
        case FETCH_REGISTERS_IN_OVER_TIME_REQUEST:
            return {
                ...state,
                isFetching: true,
                hasError: false
            }
        case FETCH_REGISTERS_IN_OVER_TIME_SUCCESS:
            const registersInTime = action.payload.events.map(event => {
                return {
                    date: event.date,
                    inTime: event.inTime
                }
            })

            const registersOverTime = action.payload.events.map(event => {
                return {
                    date: event.date,
                    overTime: event.overTime
                }
            })

            return {
                ...state,
                isFetching: false,
                registersInTime,
                registersOverTime
            }
        case FETCH_REGISTERS_IN_OVER_TIME_FAILURE:
            return {
                ...state,
                hasError: true,
                isFetching: false
            }
        case FETCH_GROUPED_EVENTS_REQUEST:
            return {
                ...state,
                isFetching: true,
                hasError: false
            }
        case FETCH_GROUPED_EVENTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                groupedEvents: action.payload.events
            }
        case FETCH_GROUPED_EVENTS_FAILURE:
            return {
                ...state,
                hasError: true,
                isFetching: false
            }
        default:
            return state
    }
}

function Stats() {
    const { state: authState, dispatch: authDispatch } = useContext(AuthContext)
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        if (authState.token) {
            dispatch({
                type: FETCH_LOGINS_IN_OVER_TIME_REQUEST
            })

            dispatch({
                type: FETCH_REGISTERS_IN_OVER_TIME_REQUEST
            })

            dispatch({
                type: FETCH_GROUPED_EVENTS_REQUEST
            })

            fetch(apiUrl('stats/events/login/in-over-time'), {
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
                    type: FETCH_LOGINS_IN_OVER_TIME_SUCCESS,
                    payload: data
                })
            }).catch(error => {
                console.error('Error fetching stats', error)

                dispatch({
                    type: FETCH_LOGINS_IN_OVER_TIME_FAILURE
                })
            })

            fetch(apiUrl('stats/events/register/in-over-time'), {
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
                    type: FETCH_REGISTERS_IN_OVER_TIME_SUCCESS,
                    payload: data
                })
            }).catch(error => {
                console.error('Error fetching stats', error)

                dispatch({
                    type: FETCH_REGISTERS_IN_OVER_TIME_FAILURE
                })
            })

            fetch(apiUrl('stats/events/grouped'), {
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
                    type: FETCH_GROUPED_EVENTS_SUCCESS,
                    payload: data
                })
            }).catch(error => {
                console.error('Error fetching stats', error)

                dispatch({
                    type: FETCH_GROUPED_EVENTS_FAILURE
                })
            })
        }
    }, [authDispatch, authState.token])

    return (
        <div className="page-stats container">

            <div className='row'>
                <div className='col-12'>
                    <h2>Stats page</h2>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-6 mb-5'>
                    <h5>Daily logins</h5>
                    <LineChart
                        width={400}
                        height={300}
                        data={state.loginsInTime}
                    >
                        <CartesianGrid strokeDasharray="5" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="inTime" stroke="#8884d8" />
                    </LineChart>
                </div>

                <div className='col-md-6 mb-5'>
                    <h5>Logins in time (increase)</h5>
                    <LineChart
                        width={400}
                        height={300}
                        data={state.loginsOverTime}
                    >
                        <CartesianGrid strokeDasharray="5" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="overTime" stroke="#63d461" />
                    </LineChart>
                </div>

                <div className='col-md-6 mb-5'>
                    <h5>Daily registers</h5>
                    <LineChart
                        width={400}
                        height={300}
                        data={state.registersInTime}
                    >
                        <CartesianGrid strokeDasharray="5" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="inTime" stroke="#8884d8" />
                    </LineChart>
                </div>

                <div className='col-md-6 mb-5'>
                    <h5>Registers in time (increase)</h5>
                    <LineChart
                        width={400}
                        height={300}
                        data={state.registersOverTime}
                    >
                        <CartesianGrid strokeDasharray="5" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="overTime" stroke="#63d461" />
                    </LineChart>
                </div>

                <div className='col-md-12 d-flex flex-column align-items-center'>
                    <hr />
                    <h5>Event contrast</h5>
                    <PieChart width={400} height={400}>
                        <Pie
                            nameKey="type"
                            dataKey="count"
                            data={state.groupedEvents}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            label
                        />
                        <Tooltip />
                    </PieChart>
                </div>
            </div>

        </div>
    )
}

export default Stats
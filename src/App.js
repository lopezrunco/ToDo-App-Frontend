import './App.scss'
import React, { createContext, useReducer, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ENABLE_MFA, HIDE_LOADER, LOGIN, LOGOUT, REFRESH_TOKEN, SHOW_LOADER } from './action-types'

// Pages
import Home from './pages/Home'
import CreateTodo from './pages/todos/CreateTodo'
import ViewTodo from './pages/todos/ViewTodo'
import Landing from './pages/Landing'
import Prefs from './pages/Prefs'
import Stats from './pages/Stats'
import Login from './pages/security/Login'
import Register from './pages/security/Register'
import Forbidden from './pages/access/Forbidden'
import NotFound from './pages/access/NotFound'
import Users from './pages/backoffice/Users'

// Components
import NavigationBar from './components/NavigationBar'
import RequireAuth from './components/RequireAuth'
import Loader from './components/Loader'
import { apiUrl } from './utils/api-url'

export const AuthContext = createContext()

const initialState = {
  isAuthenticated: !!localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user')),
  role: localStorage.getItem('role'),
  token: localStorage.getItem('token'),
  refreshToken: localStorage.getItem('refreshToken'),
  showingLoader: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      localStorage.setItem('role', action.payload.user.role)
      localStorage.setItem('token', action.payload.user.token)
      localStorage.setItem('refreshToken', action.payload.user.refreshToken)

      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        role: action.payload.user.role,
        token: action.payload.user.token,
        refreshToken: action.payload.user.refreshToken
      }
    case REFRESH_TOKEN:
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('refreshToken', action.payload.refreshToken)

      return {
        ...state,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken
      }
    case LOGOUT:
      localStorage.clear()

      return {
        ...state,
        isAuthenticated: false,
        user: null,
        role: null,
        token: null,
        refreshToken: null
      }
    case ENABLE_MFA:
      // Clones the actual user and enables the MFA
      const user = {
        ...state.user,
        mfaEnabled: true
      }

      // Saves on local storage to disable the button next time
      localStorage.setItem('user', JSON.stringify(user))

      return {
        ...state,
        user
      }
    case SHOW_LOADER:
      return {
        ...state,
        showingLoader: true,
      }
    case HIDE_LOADER:
      return {
        ...state,
        showingLoader: false,
      }
    default:
      return state
  }
}

function App() {
  const location = useLocation()
  const [state, dispatch] = useReducer(reducer, initialState)

  // On navigate change, this custom hook saves the navigation event
  useEffect(() => {
    if (state.isAuthenticated) {
      fetch(apiUrl('events'), {
        method: 'POST',
        headers: {
          'Authorization': state.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'NAVIGATION',
          context: {
            location: location.pathname + location.search
          }
        })
      }).then().catch(error => {
        console.error('Error en el fetch de eventos', error)
      })
    }
  }, [location, state.isAuthenticated, state.token])

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    const role = localStorage.getItem('role')
    const token = localStorage.getItem('token')

    // If user is logued, dispatch the user data
    if (user && token) {
      dispatch({
        type: LOGIN,
        payload: {
          user,
          role,
          token
        }
      })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <div className="App">

        <Routes>

          <Route path="/home" element={
            <RequireAuth>
              <NavigationBar />
              <Home />
            </RequireAuth>
          } />

          <Route path="/todos/:id" element={
            <RequireAuth>
              <NavigationBar />
              <ViewTodo />
            </RequireAuth>
          } />

          <Route path="/todos/create" element={
            <RequireAuth>
              <NavigationBar />
              <CreateTodo />
            </RequireAuth>
          } />

          <Route path="/stats" element={
            <RequireAuth allowedRoles={['ADMIN']}>
              <NavigationBar />
              <Stats />
            </RequireAuth>
          } />

          <Route path="/prefs" element={
            <RequireAuth>
              <NavigationBar />
              <Prefs />
            </RequireAuth>
          } />

          <Route path="/backoffice/users" element={
            <RequireAuth allowedRoles={['ADMIN']}>
              <NavigationBar />
              <Users />
            </RequireAuth>
          } />

          <Route path="/login" element={
            <Login />
          } />

          <Route path="/register" element={
            <Register />
          } />

          <Route path="/forbidden" element={
            <>
              <NavigationBar />
              <Forbidden />
            </>
          } />

          <Route path="/" element={
            <Landing />
          } />

          <Route path="*" element={
            <>
              <NavigationBar />
              <NotFound />
            </>
          } />

        </Routes>

        {state.showingLoader && (
          <Loader />
        )}

      </div>
    </AuthContext.Provider>
  )
}

export default App

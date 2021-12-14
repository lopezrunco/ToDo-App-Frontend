import './App.scss'
import React, { createContext, useReducer } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ENABLE_MFA, HIDE_LOADER, LOGIN, LOGOUT, REFRESH_TOKEN, SHOW_LOADER } from './action-types'

// Paginas
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

// Componentes
import Nav from './components/Nav'
// Componente para requerir autenticacion en determinadas rutas
import RequireAuth from './components/RequireAuth'
import Loader from './components/Loader'

// Creacion de contexto de autenticacion (Se crean contextos para manejos de datos diferentes entre si)
export const AuthContext = createContext()

// Estado inicial del contexto de auntenticacion
// Refleja si el usuario esta auntenticado o no, y cuales son los datos del usuario
const initialState = {
  isAuthenticated: !!localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user')),
  role: localStorage.getItem('role'),
  token: localStorage.getItem('token'),
  refreshToken: localStorage.getItem('refreshToken'),
  showingLoader: false    // Propiedad para manejar los escenarios de carga
}

// Reducer: elemento que recibe eventos del contexto y reacciona modificando el estado del componente
// En este caso maneja dos acciones: tipo login y tipo logout
const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      // Se toman los valores del usuario y se setean en el local storage
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      localStorage.setItem('role', action.payload.user.role)
      localStorage.setItem('token', action.payload.user.token)
      localStorage.setItem('refreshToken', action.payload.user.refreshToken)

      // Se retorna un estado nuevo
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
      // Limpia los valores del local storage
      localStorage.clear()

      // Se retorna un nuevo estado, ya reseteado
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        role: null,
        token: null,
        refreshToken: null
      }
    case ENABLE_MFA:
      // Aqui basicamente clona el usuario actual y le habilita el MFA
      const user = {
        ...state.user,
        mfaEnabled: true
      }

      // Guarda el local storage para que muestre el boton dehabilitado las siguientes veces que cargue
      localStorage.setItem('user', JSON.stringify(user))

      // Actualiza el state
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
      // Si la accion no matchea ninguno de los casos, retorna el mismo estado
      return state
  }
}

function App() {

  // Hook de useReducer: en el se envia la funcion reducer y el estado inicial que manejara el reducer
  // Deja disponible:
  // - El estado que sera manejado por el reducer
  // - El dispatch (funcion usada para el envio y recepcion de eventos)
  const [state, dispatch] = useReducer(reducer, initialState)

  // Hook useEffect: Restablece el estado de la app cada vez que carga por primera vez
  // UseEffect se utiliza para disparar comportamientos que no bloqueen el rendering de la app
  React.useEffect(() => {
    
    // Se intenta obtener del local storage todos los datos del usuario
    const user = JSON.parse(localStorage.getItem('user'))
    const role = localStorage.getItem('role')
    const token = localStorage.getItem('token')

    // Si el usuario esta logueado, se hace un dispatch de tipo login con los datos
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
  // El parametro donde esta el array vacio se utiliza cuando 
  // quiero prestar atencion a alguna propiedad en particular del estado

  // Render del componente
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <div className="App">

        <Routes>

          <Route path="/home" element={
            <RequireAuth>
              <Nav />
              <Home />
            </RequireAuth>
          } />

          <Route path="/todos/:id" element={
            <RequireAuth>
              <Nav />
              <ViewTodo />
            </RequireAuth>
          } />

          <Route path="/todos/create" element={
            <RequireAuth>
              <Nav />
              <CreateTodo />
            </RequireAuth>
          } />

          <Route path="/stats" element={
            <RequireAuth allowedRoles={['ADMIN']}>
              <Nav />
              <Stats />
            </RequireAuth>
          } />

          <Route path="/prefs" element={
            <RequireAuth>
              <Nav />
              <Prefs />
            </RequireAuth>
          } />

          <Route path="/backoffice/users" element={
            <RequireAuth allowedRoles={['ADMIN']}>
              <Nav />
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
            <Forbidden />
          } />

          <Route path="/" element={
            <Landing />
          } />

          <Route path="*" element={
            <NotFound />
          } />

        </Routes>

        {/* El loader se muestra si showingLoader es true */}
        {state.showingLoader && (
          <Loader />
        )}

      </div>
    </AuthContext.Provider>
  )
}

export default App

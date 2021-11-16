import './App.scss'
import React from 'react'
// Cambio a version 6.0.2 de React roouter
import { Routes, Route } from 'react-router-dom'

// Paginas
import Home from './pages/Home'
import Landing from './pages/Landing'
import Prefs from './pages/Prefs'
import Stats from './pages/Stats'
import Login from './pages/Login'
import Register from './pages/Register'

// Componentes
import Nav from './components/Nav'

// Creacion de contexto de autenticacion (Se crean contextos para manejos de datos diferentes entre si)
export const AuthContext = React.createContext()

// Estado inicial del contexto de auntenticacion
// Refleja si el usuario esta auntenticado o no, y cuales son los datos del usuario
const initialState = {
  isAuthenticated: false,
  user: null,
  role: null,
  token: null
}

// Reducer: elemento que recibe eventos del contexto y reacciona modificando el estado del componente
// En este caso maneja dos acciones: tipo login y tipo logout
const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      // Se toman los valores del usuario y se setean en el local storage
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      localStorage.setItem('role', action.payload.user.role)
      localStorage.setItem('token', action.payload.user.token)

      // Se retorna un estado nuevo
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        role: action.payload.user.role,
        token: action.payload.user.token
      }
    case 'LOGOUT':
      // Limpia los valores del local storage
      localStorage.clear()

      // Se retorna un nuevo estado, ya reseteado
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        role: null,
        token: null,
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
  const [state, dispatch] = React.useReducer(reducer, initialState)

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
        type: 'LOGIN',
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

        {/* Actualizacion a version 6.0.2 de React Router */}
        <Routes>
          <Route path="/stats" element={<div><Nav /><Stats /></div>} />
          <Route path="/prefs" element={<div><Nav /><Prefs /></div>} />
          <Route path="/home" element={<div><Nav /><Home /></div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Landing />} />
        </Routes>

      </div>
    </AuthContext.Provider>
  )
}


export default App

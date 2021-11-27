import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../../App'

// Se accede a los hijos por dentro de este componente
function RequireAuth({ children }) {

    // Uso del contexto para saber si el usuario esta logueado y demas info
    const { state: auth } = React.useContext(AuthContext)
    // Indica desde donde venia el usuario
    const location = useLocation()

    // Si el usuario no esta autenticado, retorna un componente de navegacion que lleva al login 
    if (!auth.isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} />
    } else {
        // Si esta autenticado, retorna los hijos, como si no hubiere pasado el filtro de autenticacion
        return children
    }
}

export default RequireAuth
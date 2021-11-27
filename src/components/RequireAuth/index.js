import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../../App'

// Se accede a los hijos por dentro de este componente
function RequireAuth({ children, allowedRoles }) {

    // Uso del contexto para saber si el usuario esta logueado y demas info
    const { state: auth } = React.useContext(AuthContext)
    // Indica desde donde venia el usuario
    const location = useLocation()
    // Chequea dentro de la lista de allowedRoles, si el rol del usuario coincide
    // Si no tengo roles admitidos (o sea es algo abierto a cualquier rol) da verdadero, si tengo roles, intenta buscarlo en la lista de roles
    const roleMatches = !allowedRoles ? true : allowedRoles.find(role => role === auth.role)



    // Si el usuario no esta autenticado, retorna un componente de navegacion que lleva al login 
    if (!auth.isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} />
    } else if (!roleMatches) {
        // Si el rol no matchea, lleva a forbidden page
        return <Navigate to="/forbidden" />
    } else {
        // Si esta autenticado, retorna los hijos, como si no hubiere pasado el filtro de autenticacion
        return children
    }
}

export default RequireAuth
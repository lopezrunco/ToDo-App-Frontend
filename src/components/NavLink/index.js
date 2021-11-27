import React from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'

// Asigna la clase active al item de menu en el que esta posicionado el usuario 
function NavLink({ children, to, ...props }) {

    // Path de la ruta
    const resolved = useResolvedPath(to)
    // La ruta actual matchea con la ruta a resolver. El parametro End especifica si se toma la ruta completa o parcial para el match 
    const match = useMatch({ path: resolved.pathname, end: true })
    // Si matchMedia, se agrega la clase .active al item de menu
    const linkClass = `nav-link ${match ? 'active' : ''}`


    return (
        <Link
            className={linkClass}
            to={to}
            {...props}
        >
            {children}
        </Link>
    )
}

export default NavLink
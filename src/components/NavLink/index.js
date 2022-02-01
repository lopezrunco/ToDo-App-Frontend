import React from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'

// Asign active class to the menu item where the user is 
function NavLink({ children, to, ...props }) {

    // Path to the route
    const resolved = useResolvedPath(to)
    // Actual route matches the route to resolve
    const match = useMatch({ path: resolved.pathname, end: true })
    // If matches, add the .active class
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
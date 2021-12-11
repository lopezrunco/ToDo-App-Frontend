import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Check2Circle } from 'react-bootstrap-icons'
import { AuthContext } from '../../App'
import NavLink from '../NavLink'

// Uso de React Bootstrap
import Button from 'react-bootstrap/Button'
import { LOGOUT } from '../../action-types'

function Nav() {
    const { state: authState, dispatch } = React.useContext(AuthContext)
    const navigate = useNavigate()

    // Al clickear el boton de salir, se llama esta funcion
    // que emite un dispatch de tipo logout y luego navega a la landing
    // Ese dispatch emitido se toma en el app.js, que limpia el localstorage y resetea el estado de autenticacion del usuario 
    const logout = () => {
        dispatch({ type: LOGOUT })
        navigate('/')
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    Tasky <Check2Circle />
                </a>

                <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbar-collapse" aria-controls="navbar-collapse">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="navbar-collapse collapse" id="navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <NavLink to="/home">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/stats">Estadisticas</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/prefs">Preferencias</NavLink>
                        </li>

                        {/* Si el usuario logueado es ADMIN, se muestra el link */}
                        {/* Si hay mas roles permitidos, se agregan al array y de esa forma amplia la busqueda */}
                        {/* Este componente se puede usar en cualquier lugar, para mostrar algo dependiendo del rol del usuario logueado */}
                        {
                            ['ADMIN'].find(role => role === authState.role) &&
                            <li className="nav-item">
                                <NavLink to="/backoffice/users">Usuarios</NavLink>
                            </li>
                        }

                        <li className="nav-item">
                            {/* Uso de React Bootstrap */}
                            <Button variant="link" className="nav-link" onClick={logout}>Salir</Button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Nav
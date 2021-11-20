import React from 'react'
import { AuthContext } from '../../../../App'

function WelcomeSection() {
    // Acceso a la info de autenticacion, para saber si esta logueado o no, para mostrar un boton u otro
    const { state } = React.useContext(AuthContext)

    return (
        <div className="position-relative overflow-hidden p-3 text-center bg-light">
            <div className="col-md-5 p-lg-5 mx-auto my-5">
                <h1 className="display-4 fw-normal">Punny headline</h1>
                <p className="lead fw-normal">
                    And an even wittier subheading to boot. Jumpstart your marketing efforts with this
                    example based on Apple’s marketing pages.
                </p>

                {/* Si el usuario esta autenticado, se muestra un boton para ir a las tareas, si no, se muestra un boton para ir a login */}
                {state.isAuthenticated ? (
                    <a className="btn btn-outline-secondary" href="home">Ver mis tareas</a>
                ) : (
                    <a className="btn btn-outline-secondary" href="login">Iniciar sesión</a>
                )}
            </div>
            <div className="product-device shadow-sm d-none d-md-block"></div>
            <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
        </div>
    )
}

export default WelcomeSection
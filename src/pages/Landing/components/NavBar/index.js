// Importacion de icono desde react bootstrap
import { Check2Circle } from 'react-bootstrap-icons'

function NavBar() {
    return (
        <header className="site-header sticky-top py-1">
                <nav className="container d-flex flex-column flex-md-row justify-content-between">
                    <div className="py-2">
                        Tasky <Check2Circle />
                    </div>

                    <a className="py-2 d-none d-md-inline-block" href="/">Tour</a>
                    <a className="py-2 d-none d-md-inline-block" href="/">Producto</a>
                    <a className="py-2 d-none d-md-inline-block" href="/">Funcionalidades</a>
                    <a className="py-2 d-none d-md-inline-block" href="/">Soporte</a>
                </nav>
            </header>
    )
}

export default NavBar
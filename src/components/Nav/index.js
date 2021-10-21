import { Link } from 'react-router-dom'

function Nav() {
    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    Tasky <i className="bi bi-check2-circle"></i>
                </a>

                <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbar-collapse" aria-controls="navbar-collapse">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="navbar-collapse collapse" id="navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <a className="nav-link active" href="/home">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/stats">Estadísticas</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/prefs">Preferencias</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Salir</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Nav
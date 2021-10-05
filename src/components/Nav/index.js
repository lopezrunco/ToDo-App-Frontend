import { Link } from 'react-router-dom'

function Nav() {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Landing</Link>
                    </li>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/prefs">Preferencias</Link>
                    </li>
                    <li>
                        <Link to="/stats">Estadisticas</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Nav
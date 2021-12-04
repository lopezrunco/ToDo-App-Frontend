import { Link } from "react-router-dom"

function Forbidden() {
    return (
        <div>
            <h2>Acceso no permitido</h2>
            <Link to="/home">Volver a home</Link>
        </div>
    )
}

export default Forbidden
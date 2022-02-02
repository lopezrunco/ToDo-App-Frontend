import { Link } from "react-router-dom"

function Forbidden() {
    return (
        <div className="container pt-5 text-center">
            <h2>Forbidden access</h2>
            <Link to="/home">Back to home</Link>
        </div>
    )
}

export default Forbidden
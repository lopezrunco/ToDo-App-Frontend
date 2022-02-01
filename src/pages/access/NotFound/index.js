import React from "react"
import { Link } from "react-router-dom"

import { AuthContext } from "../../../App"

function NotFound() {
    const { state: authState } = React.useContext(AuthContext)

    return (
        <div className="container">
            <h2>Not found!</h2>
            
            {authState.isAuthenticated ? (
                <Link to="/home">Back to home</Link>
            ) : (
                <Link to="/">Back to landing</Link>
            )}
        </div>
    )
}

export default NotFound
import './style.scss'

function Footer() {
    return (
        <footer>
            <div className="container">
                <small>© Duit <span id="year"></span> | All rights reserved</small>
                <small>| <a href="https://github.com/lopezrunco/ToDo-App-Frontend" target="_blank">Frontend</a></small>
                <small>| <a href="https://github.com/lopezrunco/ToDo-App-API-MongoDB" target="_blank">API</a></small>
            </div>
        </footer> 
    )
}

export default Footer 
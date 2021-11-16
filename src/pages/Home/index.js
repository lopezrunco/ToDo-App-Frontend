import './style.css'

function Home() {
    return (
        <main className="container mb-5">
            <div className="bg-light p-4 rounded">
                <div className="input-group mb-4">
                    <input id="search-keywords" type="text" className="form-control" placeholder="Terminos de busqueda ..." />
                    <button className ="btn btn-secondary" type ="button" onlick="applySearchFilter()">Buscar</button>
                </div>

                <ul className="nav nav-pills nav-fill mb-4">
                    <li className="nav-item">
                        <a className="nav-link active" onlick="applyTypeFilter('MY_DAY')">Mi día</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onlick="applyTypeFilter('IMPORTANT')">Importantes</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onlick="applyTypeFilter('ALL')">Todas</a>
                    </li>
                </ul>

                <div id="todos-container" className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" data-masonry='{ "percentPosition": true }'>
                </div>

                <div id="create-new-todo-hint" className="d-none">
                    <p>
                        Aun no hay tareas creadas :(
                    </p>
                </div>
            </div>

            <button 
                className="fab fab-fixed d-flex justify-content-center align-items-center bg-success"
                onlick="openTodoCreatorModal()">
                <i className="bi bi-plus"></i>
            </button>

        </main>
    )
}

export default Home
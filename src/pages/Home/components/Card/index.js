import './style.scss'
import { Eye, Trash, Circle, CircleFill } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router'

function Card({ todo }) {
    const navigate = useNavigate()

    const toggleTodoCompletion = () => {}

    const viewTodo = () => {
        // Al hacer click en el boton de ver, toma el id de la tarea y abre la viewTodo page con dicha tarea
        navigate(`/todos/${ todo.id }`)
    }

    const deleteTodo = () => {}

    return (
        <div className="todo-card col">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">{ todo.title }</h4>
                    <p className="card-text">{ todo.description }</p>
                </div>

                <div className="card-floating-actions d-flex">
                    <button
                        type="button"
                        className="btn-change-todo-status fab fab-mini me-2 d-flex justify-content-center align-items-center bg-primary"
                        onClick={toggleTodoCompletion}
                    >
                        {/* Ternario para cambiar el icono dependiendo de si la tarea esta completa o no */}
                        {todo.completed ? (
                            <CircleFill color="white" />
                            ) : (
                            <Circle color="white" />
                        )}
                    </button>

                    <button
                        type="button"
                        className="btn-view-todo fab fab-mini me-2 d-flex justify-content-center align-items-center bg-info"
                        onClick={viewTodo}
                    >
                        <Eye color="white" />
                    </button>

                    <button
                        type="button"
                        className="btn-delete-todo fab fab-mini me-2 d-flex justify-content-center align-items-center bg-danger"
                        onClick={deleteTodo}
                    >
                        <Trash color="white" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card
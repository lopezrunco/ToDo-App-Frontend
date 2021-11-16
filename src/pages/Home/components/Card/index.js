import './style.scss'
import { Eye, Trash, Circle, CircleFill } from 'react-bootstrap-icons'

function Card(props) {
    const toggleTodoCompletion = () => {}

    const viewTodo = () => {}

    const deleteTodo = () => {}

    return (
        <div className="todo-card col">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">{ props.todo.title }</h4>
                    <p className="card-text">{ props.todo.description }</p>
                </div>

                <div className="card-floating-actions d-flex">
                    <button
                        type="button"
                        className="btn-change-todo-status fab fab-mini me-2 d-flex justify-content-center align-items-center bg-primary"
                        onClick={toggleTodoCompletion}
                    >
                        {/* Ternario para cambiar el icono dependiendo de si la tarea esta completa o no */}
                        {props.todo.completed ? (
                            <Circle color="white" />
                        ) : (
                            <CircleFill color="white" />
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
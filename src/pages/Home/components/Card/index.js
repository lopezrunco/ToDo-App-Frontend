import React, { useContext } from 'react'
import { Eye, Trash, Circle, CircleFill } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router'
import { AuthContext } from '../../../../App'
import { apiUrl } from '../../../../utils/api-url'
import { refreshToken } from '../../../../utils/refresh-token'
import './style.scss'

function Card({ todo }) {
    const navigate = useNavigate()
    const { state: authState, dispatch: authDispatch } = useContext(AuthContext)

    const toggleTodoCompletion = () => {
        fetch(apiUrl(`/todos/${todo.id}/toggle-complete`), {
            method: 'PATCH', // Pasar el metodo para indicar que se debe editar. Por defecto, si no se pone metodo, asume GET
            headers: {
                'Authorization': authState.token,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw response
            }
        }).then(data => {
            // manejar caso de xtio
            // modificar el estate mediante dispatch al contexto padre
            alert(`Tarea marcada como: ${todo.completed ? 'Finalizada' : 'Sin completar'}`)
        }).catch(error => {
            console.error('Error al hacer toggle en todo', error)

            if (error.status === 401) {
                // Si sen vencio el token, lo refresca y al terminar hace retry de la misma operacion
                refreshToken(
                    authState.refreshToken,
                    authDispatch,
                    navigate,
                    () => toggleTodoCompletion
                )
            } else if (error.status === 403) {
                navigate('./forbidden')
            } else {
                alert('Error al intentar cambiar el estado de la tarea')
            }
        })
    }

    const viewTodo = () => {
        // Al hacer click en el boton de ver, toma el id de la tarea y abre la viewTodo page con dicha tarea
        navigate(`/todos/${todo.id}`)
    }

    const deleteTodo = () => {
        fetch(apiUrl(`/todos/${todo.id}`), {
            method: 'DELETE', // Pasar el metodo para indicar que se debe borrar. Por defecto, si no se pone metodo, asume GET
            headers: {
                'Authorization': authState.token,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw response
            }
        }).then(data => {
            // Manejar caso de exito
            // Eliminar del state mediante dispatch al contexto padre
            alert('Se pudo eliminar la tarea de forma exitosa')
        }).catch(error => {
            console.error('Error al eliminar todo', error)

            if (error.status === 401) {
                // Si sen vencio el token, lo refresca y al terminar hace retry de la misma operacion
                refreshToken(
                    authState.refreshToken,
                    authDispatch,
                    navigate,
                    () => deleteTodo
                )
            } else if (error.status === 403) {
                navigate('./forbidden')
            } else {
                // manejar caso error
                alert('Error al intentar eliminar la tarea')
            }
        })
    }

    return (
        <div className="todo-card col">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">{todo.title}</h4>
                    <p className="card-text">{todo.description}</p>
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
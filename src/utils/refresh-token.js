import { LOGOUT, REFRESH_TOKEN } from '../action-types'
import { apiUrl } from './api-url'

export const refreshToken = (token, dispatch, navigate, callback) => {
    // Inovoca una peticion al endpoint de refresh
    // pasandole el refresh token 
    fetch(apiUrl('auth/refresh'), {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
    }).then(response => {
        // Si sale todo ok, responde con el json, si no, tira error
        if (response.ok) {
            return response.json()
        } else {
            throw response
        }
    }).then(response => {
        // Si sale todo ok, emite dispatch avisando al contexto de seguridad sobre el Refresh token
        // Dicho aviso llegara al reducer del app.js, que actualiza el local storage y el state con los nuevos valores
        // Al hacer dicha actualizacion se disparara nuevamente el useEffect
        dispatch({
            type: REFRESH_TOKEN,
            payload: response
        })

        // Definimos una funcion callback para reutilizar el codigo en distintos contextos
        // La misma se aplicara solo si viene como parametro
        if (callback) {
            callback()
        }

    }).catch(error => {
        // En caso de error se envia al usuario a la login page y hacemos un logout dispatch para resetear el local storage
        console.error(error)

        dispatch({
            type: LOGOUT
        })

        navigate('/login')
    })
}
// Return the request string depending the route recived
export const apiUrl = (path) => {
    // Add the / symbol if the received route don't have it 
    if (!path.startsWith('/')) {
        path = `/${path}`
    }

    return `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}${path}`
}

// Output example: http://localhost:3000/login

const login = (username) => {
    return {
        type: 'login',
        username: username
    }
}
const logout = () => {
    return {
        type: 'logout',
        username: ''
    }
}

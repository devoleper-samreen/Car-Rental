export const isUserLoggedIn = () => {
    return localStorage.getItem('token') !== null
}

export const isAdminLoggedIn = () => {
    return localStorage.getItem('adminToken') !== null
}
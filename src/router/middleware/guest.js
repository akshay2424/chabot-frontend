export default function guest({ next }) {
    if (sessionStorage.getItem("loggedIn") == "true") {
        return next({
            name: 'dashboard'
        })
    }

    return next()
}
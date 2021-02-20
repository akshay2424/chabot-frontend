export default function guest({ next }) {
    if (localStorage.getItem("loggedIn") == "true") {
        return next({
            name: 'dashboard'
        })
    }

    return next()
}
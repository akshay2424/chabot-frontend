export default function auth ({ next }){
    if(localStorage.getItem("loggedIn") == "false"){
        return next({
            name: 'login'
        })
    }
   
    return next()
   }
export default function auth ({ next }){
    if(sessionStorage.getItem("loggedIn") == "false"){
        return next({
            name: 'login'
        })
    }
   
    return next()
   }
const authComp = new Object()

//define Map for users & passwords
const users = new Map()
users.set("user", "password")
users.set ("user2", "password2")

//set user auth status
authComp.isAuthenticated = false
authComp.token = null

//check if user exisits
authComp.userExists = function(user){
    console.log("User " + user + " exists: " + users.has(user))
    return users.has(user)
}

//function to check login
authComp.checkLogin = function(user, password){
    if (!users.has(user)){
        return false
    }
    var correctPwd = users.get(user)
    console.log("Correct password: " + correctPwd)
    return (password == correctPwd)
},

//add new user; return false if it already exists
authComp.addUser = function (user, password){
    if(authComp.userExists(user)){
        return false
    }
    users.set(user, password)
    return true
}



export default authComp
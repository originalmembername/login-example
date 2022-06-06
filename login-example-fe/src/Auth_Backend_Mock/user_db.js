const user_db = new Object()

//define Map for users & passwords
const users = new Map()
users.set("user", "password")
users.set ("user2", "password2")

//check if user exisits
user_db.userExists = function(user){
    console.log("User " + user + " exists: " + users.has(user))
    return users.has(user)
}

//function to check login
user_db.checkLogin = function(user, password){
    if (!users.has(user)){
        return false
    }
    var correctPwd = users.get(user)
    console.log("Correct password: " + correctPwd)
    return (password == correctPwd)
},

//add new user; return false if it already exists
user_db.addUser = function (user, password){
    if(user_db.userExists(user)){
        return false
    }
    users.set(user, password)
    return true
}


export default user_db
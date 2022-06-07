const user_db = new Object()

//define Map for users & passwords
const users = new Map()
users.set("user", "password")
users.set("user2", "password2")

const userTokens = new Map()

//check if this token is registered, i.e. user is logged in
user_db.isLoggedIn = function (token) {
    return userTokens.has(token)
}

//remove a token, i.e. log out user
user_db.removeToken = function (token) {
    if (userTokens.has(token)) {
        userTokens.delete(token)
        return true
    }
    return false
}

//register token for user
user_db.registerToken = function (token, user) {
    var today = new Date();
    var date = today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear()
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    var lastLogin = date + ' ' + time
    console.log("Registering token " + token + " for user " + user + " at " + lastLogin)
    userTokens.set(token, new Object({
        user: user,
        lastLogin: lastLogin
    }))
}

//check if user exisits
user_db.userExists = function (user) {
    console.log("User " + user + " exists: " + users.has(user))
    return users.has(user)
}

//function to check login credentials
user_db.checkLogin = function (user, password) {
    if (!users.has(user)) {
        return false
    }
    var correctPwd = users.get(user)
    console.log("Correct password: " + correctPwd)
    return (password == correctPwd)
},

    //add new user; return false if it already exists
    user_db.addUser = function (user, password) {
        if (user_db.userExists(user)) {
            return false
        }
        users.set(user, password)
        return true
    }


export default user_db
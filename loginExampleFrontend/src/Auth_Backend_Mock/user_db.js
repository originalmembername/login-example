/* const user_db = new Object()

//define Map for users & passwords
const users = new Map()
users.set("user", "password")
users.set("user2", "password2")

const cities = new Map()
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
    if(userTokens.has(token)){
        return false
    }
    userTokens.set(token, user)
    console.log("Registered token " + token + " for user " + user)
    return true
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
    user_db.addUser = function (user, password, city) {
        if (user_db.userExists(user)) {
            return false
        }
        users.set(user, password)
        cities.set(user, city)
        return true
    }


export default user_db */
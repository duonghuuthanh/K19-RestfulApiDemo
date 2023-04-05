import cookie from "react-cookies"

const userReducer = (state, action) => {
    switch (action.type) {
        case "login":
            return action.payload
        case "logout":
            cookie.remove("access-token")
            cookie.remove("current-user")
            return null
        default:
            return state
    }
}

export default userReducer
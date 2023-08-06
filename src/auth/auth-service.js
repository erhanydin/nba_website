

const userinfo = localStorage.getItem("userinfo")

function AuthHeader () {

    if(userinfo && userinfo.token) {
        return {"Authorization": userinfo.token}
    } else {
        return {}
    }
}


const authService = {
    AuthHeader
}

export default authService;
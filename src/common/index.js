const backendDomain = "http://localhost:8080"

const summaryApi = {
    singup : {
        url : `${backendDomain}/api/sign-up`,
        method : "post"
    } ,
    singIn : {
        url : `${backendDomain}/api/sign-in`,
        method : "post"
    },
    current_user : {
        url : `${backendDomain}/api/user-details`,
        method : "get"
    }
}

export default summaryApi
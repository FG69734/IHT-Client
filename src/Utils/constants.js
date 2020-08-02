export const URL = "http://localhost:8080/api"
export const token = localStorage.getItem("token")

export const getHeaderConfig = () =>{
    return{
        headers:{
            Authorization: localStorage.getItem("token")
        }
    }
}

export const getHeaderConfigFormData = () =>{
    return{ 
        headers:{
            Authorization: localStorage.getItem("token"),
            ContentType: 'multipart/form-data',
            Accept: 'application/json'
        }
    }
}
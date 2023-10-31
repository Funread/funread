import { axiosWithoutAuth } from "./axiosInstances";

export async function sendMail(message,subjet,to){
    return axiosWithoutAuth().post('email/sendmail/',{
        message:message,
        subjet:subjet,
        to:to
    })
}
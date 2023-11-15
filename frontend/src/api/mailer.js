import { axiosWithoutAuth } from "./axiosInstances";

export async function sendMail(subjet, to, message){
    return axiosWithoutAuth().post('email/sendmail/',{
        message:message,
        subjet:subjet,
        to:to
    })
}
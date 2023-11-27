import { axiosAuth } from './axiosInstances'

export async function new_userrole(iduser,idrole) {
    return axiosAuth().post('/userroles/insertUserRoles/',{
        iduser:iduser,
        idrole:idrole
    })
}

export async function listedStudents() {
    return axiosAuth().get('/userroles/listedStudents/')
  }
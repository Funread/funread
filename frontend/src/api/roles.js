import { axiosAuth } from './axiosInstances'

export async function list_All_Roles() {
    return axiosAuth().get('/roles/listAllRoles/')
}
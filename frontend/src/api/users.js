import { axiosWithoutAuth, axiosAuth } from './axiosInstances'
//agregar una funcion por cada endpoint necesario, asegurarse de usar el async-await, ya que son peticiones a la api
const moment = require('moment')

export async function login(email, password) {
  return await axiosWithoutAuth().post('users/login/', {
    email: email,
    password: password,
  })
}

export async function tokenVerify() {
  return await axiosAuth().post('users/tokenVerify/')
}

export async function new_user(name, email, password) {
  return axiosWithoutAuth().post('users/new-user/', {
    email: email,
    name: name,
    lastname: 'Falta propiedad en frontend (Formulario)',
    password: password,
    createdat: moment().format(),
    actived: 1,
    username: null,
  })
}

export async function usersList() {
  return axiosAuth().get('/users/list/')
}

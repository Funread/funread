import { axiosAuth } from './axiosInstances'
import fullBookJson from './fullBook.json'
//agregar una funcion por cada endpoint necesario, asegurarse de usar el async-await, ya que son peticiones a la api
const moment = require('moment')

export async function new_book(
  title,
  category,
  portrait,
  createdby,
  updatedby,
  state,
  sharedbook,
  lastupdateby,
  description
) {
  return axiosAuth().post('books/new-book/', {
    title: title,
    category: category,
    portrait: portrait,
    createdby: createdby,
    createdat: moment().format(),
    updatedby: updatedby,
    lastupdateat: moment().format(),
    state: state,
    sharedbook: sharedbook,
    lastupdateby: lastupdateby,
    description: description,
  })
}

export async function bookSearch(title) {
  return axiosAuth().get('books/search/' + title)
}

export async function bookChange(
  title,
  new_title,
  portrait,
  category,
  createdby,
  updatedby,
  state
) {
  return axiosAuth().put('books/change/', {
    title: title,
    new_title: new_title,
    portrait: portrait,
    category: category,
    createdby: createdby,
    updatedby: updatedby,
    lastupdateat: moment().format(),
    state: state,
  })
}

export async function listed() {
  return axiosAuth().get('books/list/')
}

export async function listed_PublishedBooks() {
  return axiosAuth().get('books/list-published/')
}

export async function listed_NotPublishedBooks() {
  return axiosAuth().get('books/list-notPublished/')
}

export async function listed_PrivateBooks() {
  return axiosAuth().get('books/list-private/')
}

export async function modifyStateToPrivate(title) {
  return axiosAuth().put('books/modify-state-private/', {
    title: title,
  })
}

export async function modifyStateToPublish(title) {
  return axiosAuth().put('books/modify-state-publish/', {
    title: title,
  })
}
export async function bookSearchById(idBook) {
  return axiosAuth().get('books/book-by-id/' + idBook)
}

export function fullBook(idBook) {
  return axiosAuth().get('books/full-book/' + idBook)
 
  // Datos quemados
  // return fullBookJson
}

import { axiosAuth } from './axiosInstances'
//agregar una funcion por cada endpoint necesario, asegurarse de usar el async-await, ya que son peticiones a la api
// const moment = require('moment')

export async function listCategories() {
  return axiosAuth().get('bookdilemma/listcategory/')
}

export async function searchDimensionByCategory(categoryId) {
  return axiosAuth().get('bookdilemma/searchdimension/' + categoryId)
}

export async function searchDilemmaByDimension(dimensionId) {
  return axiosAuth().get('bookdilemma/searchdilemma/' + dimensionId)
}

export async function newDilemaPerBook(bookdilemmaid, bookid) {
  return axiosAuth().post('bookdilemma/newdilemmaperbook/', {
    bookdilemmaid: bookdilemmaid,
    bookid: bookid,
  })
}

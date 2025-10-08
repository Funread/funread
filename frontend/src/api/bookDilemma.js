import { axiosAuth } from './axiosInstances'

export async function listCategories() {
  return axiosAuth().get('bookdilemma/listcategory/')
}

export async function listDimensions() {
  return axiosAuth().get('bookdilemma/listdimension/')
}

export async function searchCategory(categoryId) {
  return axiosAuth().get('bookdilemma/searchcategory/' + categoryId)
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

// Obtener categoría, dimensiones y dilemas de un libro
export async function getBookCategoryDimensionDilemmas(bookid) {
  return axiosAuth().get(`bookdilemma/getcategoryperbook/${bookid}`)
}

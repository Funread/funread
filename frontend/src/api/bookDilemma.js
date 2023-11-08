import { axiosAuth } from './axiosInstances'

export async function listCategories() {
  return axiosAuth().get('bookdilemma/listcategory/')
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

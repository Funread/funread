import { axiosAuth } from './axiosInstances'

export async function newPage(
  bookid,
  type,
  template,
  elementorder,
  gridDirection,
  gridNumRows
) {
 
  return axiosAuth().post('pages/insertPage/', {
    bookid: bookid,
    type: type,
    template: template,
    elementorder: elementorder,
    gridDirection: gridDirection,
    gridNumRows: gridNumRows,
  })
}

export async function listallPages() {
  return axiosAuth().get('pages/ listallPages/')
}

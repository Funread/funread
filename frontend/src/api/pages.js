import { axiosAuth } from './axiosInstances'
 
export async function listAllPages(bookid) {
  return axiosAuth().get('pages/listallPages/', {
    params: { bookid }
  });
}
export async function updatePageType(pageid, type) {
  console.log('updatePageType')
  console.log(pageid)
  console.log(type)
  return axiosAuth().put('pages/updatePageType/', {
    pageid,
    type,
  });
}

export async function newPage(bookid, type, template, elementorder, gridDirection, gridNumRows) {
  console.log('newPage')
  return axiosAuth().post("pages/insertPage/", {
    bookid,
    type,
    template,
    elementorder,
    gridDirection,
    gridNumRows,
  });
}


import { axiosAuth } from './axiosInstances'
 
export async function listAllPages(bookid) {
  return axiosAuth().get('pages/listallPages/', {
    params: { bookid }
  });
}
export async function updatePageType(pageid, type) {
  return axiosAuth().put('pages/updatePageType/', {
    pageid,
    type,
  });
}

export async function newPage(bookid, type, template, elementorder, gridDirection, gridNumRows) {
  console.log('newPage')
  console.log(bookid)
  console.log(type)
  console.log(template)
  console.log(elementorder)
  console.log(gridDirection)
  console.log(gridNumRows) 
  return axiosAuth().post("pages/insertPage/", {
    bookid,
    type,
    template,
    elementorder,
    gridDirection,
    gridNumRows,
  });
}


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

  return axiosAuth().post("pages/insertPage/", {
    bookid,
    type,
    template,
    elementorder,
    gridDirection,
    gridNumRows,
  });
}

export async function deletePage(pageid) {
  return axiosAuth().put('pages/deletePage/', {
    pageid,
  });
}

export async function swapPages(pageid1, pageid2) {
  return axiosAuth().put('pages/swapPages/', {
    pageid1,
    pageid2,
  });
}


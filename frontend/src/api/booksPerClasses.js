import { axiosAuth } from "./axiosInstances";

export async function newBookPerClass(booksid, classesid, order, isactive) {
  return axiosAuth().post("booksPerClasses/insertnewBooksPerClasses/", {
    booksid: booksid,
    classesid: classesid,
    order: order,
    isactive: isactive,
  });
}

export async function listedBooksPerClasses() {
  return axiosAuth().get("booksPerClasses/listAllBooksPerClasses/");
}

export async function listedBooksPerClassesById(classId) {
  return axiosAuth().get("booksPerClasses/listBooksPerClassesid/" + classId);
}

import { axiosAuth } from './axiosInstances'

export async function upload(name) {
  return axiosAuth().post('Media/upload/', {
    name: name,
  })
}

export async function save_Image(file, galleryType) {
  const formFile = new FormData();
  formFile.append('file', file);
  if (galleryType !== undefined) {
    formFile.append('galleryType', galleryType);
  }
  return axiosAuth().post('Media/save/', formFile);
}

export async function list() {
  return axiosAuth().get('Media/list/')
}

export async function getImage(imageRoute) {
  return axiosAuth().get('Media/' + imageRoute)
}

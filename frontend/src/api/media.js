import { axiosAuth } from "./axiosInstances";

export async function upload(name) {
  return axiosAuth().post("Media/upload/", {
    name: name,
  });
}

export async function save_Image(image) {
  return axiosAuth().post("Media/save/", image);
}

export async function list() {
  return axiosAuth().get("Media/list/");
}

export async function save(image) {
  return axiosAuth().post('Media/save/', image)
}

export async function getImage(imageRoute) {
  return axiosAuth().get('Media/' + imageRoute)
}

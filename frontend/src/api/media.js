import { axiosAuth } from './axiosInstances'

export async function upload(name) {
  return axiosAuth().post('Media/upload/', {
    name: name,
  })
}

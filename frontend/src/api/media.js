import { axiosAuth } from './axiosInstances'

export async function upload(name) {
  return axiosAuth().post('Media/upload/', {
    name: name,
  })
}

export async function save(image) {
  return axiosAuth().post('Media/save/',image )
   

 
}



export async function showimage(imageRoute) {
  return axiosAuth().post('Media/',imageRoute )
   

 
}



import { axiosWithoutAuth } from "./axiosInstances";

export async function google_translate(text,target_lenguage) {
  return await axiosWithoutAuth().post('/translate/googleTraslate/',{text:text,target_language:target_lenguage})
}
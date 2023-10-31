import {axiosAuth } from "./axiosInstances";

export async function new_code(value) {
    return axiosAuth().post('widget/insertWidget/', {
      value: value,
    }) 
  }

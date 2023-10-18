import { axiosAuth } from './axiosInstances'

export async function newGroup(name, image, createdby, isactive) {
  return axiosAuth().post('GroupsCreate/new_group/', {
    name: name,
    image: image,
    createdby: createdby,
    isactive: isactive,
  })
}

export async function listedCreatedBy(id) {
  return axiosAuth().get('GroupsCreate/listedCreateby/' + id)
}

export async function deleteGroup(idgroup) {
  return axiosAuth().post('GroupsCreate/delete_groups/', {
    idgroup: idgroup,
  })
}

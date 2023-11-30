import { axiosAuth } from './axiosInstances'

export async function newStudentGroup(
  userid,
  isteacher,
  createdby,
  groupscreateid
) {
  return axiosAuth().post(
    'studentsgroups/insertnewStudentsGroups/',
    {
      userid: userid,
      isteacher: isteacher,
      createdby: createdby,
      groupscreateid: groupscreateid
    }
  )
}

export async function listedStudentGroups() {
  return axiosAuth().get('studentsgroups/listAllStudentsGroups/')
}

export async function studentGroupSearch(groupId) {
  return axiosAuth().post(
    'studentsgroups/searchStudentsGroups/', {
      GroupsCreateId:groupId
    }
  )
}

export async function deleteStudentGroup(userId) {
  return axiosAuth().put(
    'studentsgroups/deleteStudentsGroups/',
    {
      studentsgroupsid: userId,
    }
  )
}

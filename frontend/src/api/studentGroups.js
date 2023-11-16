import { axiosAuth } from './axiosInstances'

export async function newStudentGroup(
  userid,
  isteacher,
  createdby,
  groupscreateid
) {
  return axiosAuth().post(
    'studentsgroups/studentsgroups/insertnewStudentsGroups/',
    {
      userid: userid,
      isteacher: isteacher,
      createdby: createdby,
      groupscreateid: groupscreateid,
    }
  )
}

export async function listedStudentGroups() {
  return axiosAuth().get('studentsgroups/studentsgroups/listAllStudentsGroups/')
}

export async function studentGroupSearch(groupId) {
  return axiosAuth().get(
    'studentsgroups/studentsgroups/searchStudentsGroups/' + groupId
  )
}

export async function deleteStudentGroup(userId) {
  return axiosAuth().put(
    'studentsgroups/studentsgroups/deleteStudentsGroups/',
    {
      userid: userId,
    }
  )
}

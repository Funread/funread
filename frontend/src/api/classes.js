import { axiosAuth } from './axiosInstances'
const moment = require('moment')

export async function newClass(
  name,
  grade,
  teacherassigned,
  startdate,
  finishdate,
  groupscreateid,
  isactive
) {

  return axiosAuth().post('classes/createClasses', {
    name: name,
    grade: grade,
    teacherAssigned: teacherassigned,
    createdat: moment().format(),
    lastupdateat: moment().format(),
    startdate: startdate,
    finishdate: finishdate,
    groupscreateid: groupscreateid,
    isactive: isactive,
  })
}

export async function listedclasses() {
  return axiosAuth().get('classes/listedClasses')
}

export async function classesChange(
  classesId,
  name,
  grade,
  teacherAssigned,
  createdat,
  lastupdateat,
  startdate,
  finishdate,
  groupscreateid,
  isactive
) {
  return axiosAuth().put('classes/changeClasses', {
    classesId: classesId,
    name: name,
    grade: grade,
    teacherAssigned: teacherAssigned,
    createdat: createdat,
    lastupdateat: lastupdateat,
    startdate: startdate,
    finishdate: finishdate,
    groupscreateid: groupscreateid,
    isactive: isactive,
  })
}

export async function deleteclasses(classesId) {
  return axiosAuth().put('classes/deleteClasses', {
    classesId: classesId,
  })
}

export async function listedClassesId(group) {
  return axiosAuth().post('classes/listedClassesid', {
    group: group,
  })
}

export async function getClassById(classId) {
  return axiosAuth().get(`classes/getClassById/${classId}`)
}

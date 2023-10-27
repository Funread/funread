import { axiosAuth } from "./axiosInstances";

export async function createclasses(name,grade,teacherAssigned,createdat,lastupdateat,startdate,finishdate, groupscreateid, isactive) {
    return axiosAuth().post('classes/createClasses',{
        name:name,
        grade:grade,
        teacherAssigned:teacherAssigned,
        createdat:createdat,
        lastupdateat:lastupdateat,
        startdate:startdate,
        finishdate:finishdate,
        groupscreateid:groupscreateid,
        isactive:isactive,
    })
}

export async function listedclasses() {
    return axiosAuth().get('classes/listedClasses')
}

export async function classesChange(name,grade,teacherAssigned,createdat,lastupdateat,startdate,finishdate, groupscreateid, isactive) {
    return axiosAuth().post('classes/changeClasses',{
        name:name,
        grade:grade,
        teacherAssigned:teacherAssigned,
        createdat:createdat,
        lastupdateat:lastupdateat,
        startdate:startdate,
        finishdate:finishdate,
        groupscreateid:groupscreateid,
        isactive:isactive,
    })
}

export async function deleteclasses() {
    return axiosAuth().get('classes/deleteClasses')
}

export async function listedclassesid() {
    return axiosAuth().get('classes/listedClassesid')
}
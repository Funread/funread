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

export async function listBadgePerUser(userId) {
    userId = 4; // ID del usuario que deseas consultar
  try {
    const response = await axiosAuth().get(`Badges/listByuser/${userId}/`);
    console.log('Respuesta del servidor:', response.data);
    return response.data; // Retorna los datos recibidos
} catch (error) {
    // Manejo de errores
    if (error.response) {
        console.error('Error en la respuesta del servidor:', error.response.data);
    } else if (error.request) {
        console.error('No se recibió respuesta del servidor:', error.request);
    } else {
        console.error('Error al configurar la solicitud:', error.message);
    }
    throw error; // Relanza el error para que sea manejado en otro lugar si es necesario
}
}

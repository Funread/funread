import axios from "axios";

const moment = require("moment");


export const listStudentsGroups = async() => {

    try {
      

    const data = await axios({
      method: "get",
      url: "http://127.0.0.1:8000/studentsgroups/studentsgroups/listAllStudentsGroups/",
    });

  
    if (data.status === 200 ) {

      console.log(data.data)
    }

  } catch (error) {
      console.log(error)
      console.log('Error en la consulta de la lista');
  }

  

  };

export const insertStudentsGroups = async(StudentsGroups) => {

    try {
      

    const data = await axios({
      method: "post",
      url: "http://127.0.0.1:8000/studentsgroups/studentsgroups/insertnewStudentsGroups/",
      data: {
        userId:1,
        isTeacher:1,
        createdBy:2
    },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('Se ingreso correctamente el StudentsGroups');
    
    }

  } catch (error) {
      console.log(error)
      console.log('Es posible que  ya exista el StudentsGroups, debe ingresar otro');
  }
  };

  export const deleteStudentsGroups = async() => {

    try {
      

    const data = await axios({
      method: "delete",
      url:"http://127.0.0.1:8000/studentsgroups/studentsgroups/deleteStudentsGroups/",
      data: { 
        groupId:3
      }
    });

  
    if (data.status === 200 ) {
      console.log("Se elimino exitosamente")
    }

  } catch (error) {
      console.log(error)
      console.log('Este StudentsGroups no existe');
  }

  

  };

  export const editStudentsGroups = async(StudentsGroups) => {

    try {
      

    const data = await axios({
      method: "put",
      url: "http://127.0.0.1:8000/studentsgroups/studentsgroups/updateStudentsGroups/",
      data: {
        groupId: 1,
        isTeacher: 0,
        userId: 1,
        createdBy: 1
    },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('Se actualizo correctamente el StudentsGroups');
    
    }

  } catch (error) {
      console.log(error)
      console.log('Es posible que  ya exista el StudentsGroups, debe ingresar otro');
  }
  };



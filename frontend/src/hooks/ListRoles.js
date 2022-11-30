import axios from "axios";

const moment = require("moment");


export const listRole = async() => {

    try {
      

    const data = await axios({
      method: "get",
      url: "http://127.0.0.1:8000/roles/roles/listAllRoles/",
    });

  
    if (data.status === 200 ) {
    //   console.log('La lista de roles fue consultada correctamente');
      console.log(data.data)
    }

  } catch (error) {
      console.log(error)
      console.log('Error en la consulta de la lista');
  }

  

  };

export const insertRole = async(role) => {

    try {
      

    const data = await axios({
      method: "post",
      url: "http://127.0.0.1:8000/roles/roles/insertRoles/",
      data: {
        role:"role1"
    },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('Se ingreso correctamente el Role');
    
    }

  } catch (error) {
      console.log(error)
      console.log('Es posible que  ya exista el Role, debe ingresar otro');
  }
  };

  export const deleteRole = async() => {

    try {
      

    const data = await axios({
      method: "delete",
      url:"http://127.0.0.1:8000/roles/roles/deleteRoles/",
      data: { 
        rolesid:5
      }
    });

  
    if (data.status === 200 ) {
      console.log("Se elimino exitosamente")
    }

  } catch (error) {
      console.log(error)
      console.log('Este role no existe');
  }

  

  };

  export const editRole = async(role) => {

    try {
      

    const data = await axios({
      method: "put",
      url: "http://127.0.0.1:8000/roles/roles/updateRoles/",
      data: {
        rolesid: 6,
        role: "numero2"
    },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('Se actualizo correctamente el Role');
    
    }

  } catch (error) {
      console.log(error)
      console.log('Es posible que  ya exista el Role, debe ingresar otro');
  }
  };




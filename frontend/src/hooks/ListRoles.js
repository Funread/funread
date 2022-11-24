import axios from "axios";

const moment = require("moment");


export const UseListRole = async() => {

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

export const InsertRole = async(role) => {

    try {
      

    const data = await axios({
      method: "post",
      url: "http://127.0.0.1:8000/roles/roles/insertRoles/",
      data: {
        role: role
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

  export const DeleteRole = async() => {

    try {
      

    const data = await axios({
      method: "delete",
      url:"http://127.0.0.1:8000/roles/roles/deleteRoles/admin",
    });

  
    if (data.status === 200 ) {
      console.log("Se elimino exitosamente")
    }

  } catch (error) {
      console.log(error)
      console.log('Este rol no existe');
  }

  

  };

  export const EditRole = async(role) => {

    try {
      

    const data = await axios({
      method: "put",
      url: "http://127.0.0.1:8000/roles/roles/updateRoles/pepito",
      data: {
        role: role
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




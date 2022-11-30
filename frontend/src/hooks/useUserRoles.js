import axios from "axios";

const moment = require("moment");


export const listUserRoles = async() => {

    try {
      

    const data = await axios({
      method: "get",
      url: "http://127.0.0.1:8000/roles/userroles/listAllUserRoles/",
    });

  
    if (data.status === 200 ) {
    //   console.log('La lista de UserRoles fue consultada correctamente');
      console.log(data.data)
    }

  } catch (error) {
      console.log(error)
      console.log('Error en la consulta de la lista');
  }

  

  };

export const insertUserRole = async(UserRole) => {

    try {
      

    const data = await axios({
      method: "post",
      url: "http://127.0.0.1:8000/roles/userroles/insertUserRoles/",
      data: {
        idrole:7,
        iduser:1
    },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('Se ingreso correctamente el UserRole');
    
    }

  } catch (error) {
      console.log(error)
      console.log('Es posible que  ya exista el UserRole, debe ingresar otro');
  }
  };

  export const deleteUserRole = async() => {

    try {
      

    const data = await axios({
      method: "delete",
      url:"http://127.0.0.1:8000/roles/userroles/deleteUserRoles/",
      data: { 
        userrolesid: 2
      }
    });

  
    if (data.status === 200 ) {
      console.log("Se elimino exitosamente")
    }

  } catch (error) {
      console.log(error)
      console.log('Este UserRole no existe');
  }

  

  };

  export const editUserRole = async(UserRole) => {

    try {
      

    const data = await axios({
      method: "put",
      url: "http://127.0.0.1:8000/roles/userroles/updateUserRoles/",
      data: {
        userrolesid: 2,
        idrole:7,
        iduser:1
    },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('Se actualizo correctamente el UserRole');
    
    }

  } catch (error) {
      console.log(error)
      console.log('Es posible que  ya exista el UserRole, debe ingresar otro');
  }
  };




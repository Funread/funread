import axios from "axios";

const moment = require("moment");


export const useRoles = () => {
 
  const InsertRole = async(role) => {

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

 
};
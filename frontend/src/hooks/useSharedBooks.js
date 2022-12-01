import axios from "axios";

const moment = require("moment");


export const useListSharedBooks = async() => {

    try {
      

    const data = await axios({
      method: "get",
      url: "http://127.0.0.1:8000/sharedbooks/sharedbooks/listAllSharedBooks/",
    });

  
    if (data.status === 200 ) {
        console.log('La lista de shared books fue consultada correctamente');
      console.log(data.data)
    }

  } catch (error) {
      console.log(error)
      console.log('Error en la consulta de la lista');
  }

  

  };

  export const searchSharedBooks = async() => {

    try {
      
    const data = await axios({
      method: "post",
      url: "http://127.0.0.1:8000/sharedbooks/sharedbooks/searchSharedBooks/",
      
      data: {
        sharedbooksid:5
      }
    });

  
    if (data.status === 200 ) {
      console.log('El SharedBook fue consultado correctamente');
      console.log(data.data)
    }

  } catch (error) {
      console.log(error)
      console.log('Error en la consulta del SharedBook');
  }

  };

export const insertSharedBooks = async(user, book) => {

    try {
      

    const data = await axios({
      method: "post",
      url: "http://127.0.0.1:8000/sharedbooks/sharedbooks/insertnewSharedBooks/",
      data: {
        userId:user,
        bookId:book
      },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('Se ingreso correctamente');
    
    }

  } catch (error) {
      console.log(error)
      console.log('Es posible que  ya exista, debes ingresar otro');
  }
  };

  export const deleteSharedBooks = async() => {

    try {
      

    const data = await axios({
      method: "delete",
      url:"http://127.0.0.1:8000/sharedbooks/sharedbooks/deleteSharedBooks/",
      data: { 
        sharedbooksid:5
      }
    });

  
    if (data.status === 200 ) {
      console.log("Se elimino exitosamente")
    }

  } catch (error) {
      console.log(error)
      console.log('Este SharedBook no existe');
  }

  

  };

  export const editSharedBooks = async(role) => {

    try {
      

    const data = await axios({
      method: "put",
      url: "http://127.0.0.1:8000/sharedbooks/sharedbooks/updateSharedBooks/",
      data: {
        sharedbooksid:5,
        bookId:2,
        userId:1
      },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('Se actualizo correctamente el SharedBook');
    
    }

  } catch (error) {
      console.log(error)
      console.log('Es posible que  ya exista, debe ingresar otro');
  }
  };
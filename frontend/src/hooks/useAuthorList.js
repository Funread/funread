import axios from "axios";

const moment = require("moment");


export const UseListAuthor = async() => {

    try {
      

    const data = await axios({
      method: "get",
      url: "http://127.0.0.1:8000/author/AuthorList/listAllAuthor/",
    });

  
    if (data.status === 200 ) {
    //   console.log('La lista de Author fue consultada correctamente');
      console.log(data.data)
    }

  } catch (error) {
      console.log(error)
      console.log('Error en la consulta de la lista');
  }

  

  };

export const InsertAuthorList = async(role) => {

    try {
      

    const data = await axios({
      method: "post",
      url: "http://127.0.0.1:8000/author/AuthorList/insertAuthorList/",
      data: {
        userId:1,
        bookId:1
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

  export const DeleteAuthor = async() => {

    try {
      

    const data = await axios({
      method: "delete",
      url:"http://127.0.0.1:8000/author/AuthorList/deleteAuthorList/",
      data: { 
        authorlistid:4
      }
    });

  
    if (data.status === 200 ) {
      console.log("Se elimino exitosamente")
    }

  } catch (error) {
      console.log(error)
      console.log('Este author no existe');
  }

  

  };

  export const EditAuthor = async(role) => {

    try {
      

    const data = await axios({
      method: "put",
      url: "http://127.0.0.1:8000/author/AuthorList/updateAuthorList/",
      data:   {
        authorlistid:5,
        userId:2,
        bookId:2
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
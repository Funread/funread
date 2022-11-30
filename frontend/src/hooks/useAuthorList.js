import axios from "axios";

const moment = require("moment");


export const useListAuthor = async() => {

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

  export const searchAuthor = async() => {

    try {
      
    const data = await axios({
      method: "post",
      url: "http://127.0.0.1:8000/author/AuthorList/searchAuthorList/",
      
      data: {
        authorlistid:6
      }
    });

  
    if (data.status === 200 ) {
      console.log('El author fue consultado correctamente');
      console.log(data.data)
    }

  } catch (error) {
      console.log(error)
      console.log('Error en la consulta del author');
  }

  };

export const insertAuthorList = async(user, book) => {

    try {
      

    const data = await axios({
      method: "post",
      url: "http://127.0.0.1:8000/author/AuthorList/insertAuthorList/",
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

  export const deleteAuthor = async() => {

    try {
      

    const data = await axios({
      method: "delete",
      url:"http://127.0.0.1:8000/author/AuthorList/deleteAuthorList/",
      data: { 
        authorlistid:8
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

  export const editAuthor = async(role) => {

    try {
      

    const data = await axios({
      method: "put",
      url: "http://127.0.0.1:8000/author/AuthorList/updateAuthorList/",
      data: {
        authorlistid:6,
        userId:2,
        bookId:1
      },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('Se actualizo correctamente el Role');
    
    }

  } catch (error) {
      console.log(error)
      console.log('Es posible que  ya exista el author, debe ingresar otro');
  }
  };
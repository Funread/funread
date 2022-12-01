import axios from "axios";

const moment = require("moment");


export const useListTagsPerPage = async() => {

    try {
      

    const data = await axios({
      method: "get",
      url: "http://127.0.0.1:8000/tagsperpage/tagsPerPage/listAllTagsPerPage/",
    });

  
    if (data.status === 200 ) {
        console.log('La lista de TagsPerPage fue consultada correctamente');
      console.log(data.data)
    }

  } catch (error) {
      console.log(error)
      console.log('Error en la consulta de la lista');
  }

  

  };

  export const searchTagsPerPage = async() => {

    try {
      
    const data = await axios({
      method: "post",
      url: "http://127.0.0.1:8000/tagsperpage/tagsPerPage/searchTagsPerPage/",
      
      data: {
        tagsPerPageId:4
      }
    });

  
    if (data.status === 200 ) {
      console.log('Este TagsPerPage fue consultado correctamente');
      console.log(data.data)
    }

  } catch (error) {
      console.log(error)
      console.log('Error en la consulta de TagsPerPage');
  }

  };

export const insertTagsPerPage = async(page, tags) => {

    try {
      

    const data = await axios({
      method: "post",
      url: "http://127.0.0.1:8000/tagsperpage/tagsPerPage/insertnewTagsPerPage/",
      data: {
        pageId:page,
        tagsId:tags
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

  export const deleteTagsPerPage = async() => {

    try {
      

    const data = await axios({
      method: "delete",
      url:"http://127.0.0.1:8000/tagsperpage/tagsPerPage/deleteTagsPerPage/",
      data: { 
        tagsPerPageId:4
      }
    });

  
    if (data.status === 200 ) {
      console.log("Se elimino exitosamente")
    }

  } catch (error) {
      console.log(error)
      console.log('Este TagsPerPage no existe');
  }

  

  };

  export const editTagsPerPage = async(role) => {

    try {
      

    const data = await axios({
      method: "put",
      url: "http://127.0.0.1:8000/tagsperpage/tagsPerPage/updateTagsPerPage/",
      data: {
        tagsPerPageId:4,
        pageId:2,
        tagsId:1
      },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('Se actualizo correctamente el TagPerPage');
    
    }

  } catch (error) {
      console.log(error)
      console.log('Es posible que  ya exista, debe ingresar otro');
  }
  };
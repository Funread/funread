import axios from "axios";

const moment = require("moment");

//CREATE--------------------------------------------------------------------------------------------------------------

export const InsertPages = async (book,elementorder,type,template) => {
    try {
    const data = await axios({
      method: "post",
      url: "http://127.0.0.1:8000/pages/new-page/",
      data: {
        book:book,
        elementorder:elementorder,
        type:type,
        template:template
    },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('The Page was entered correctly');
    
    }

  } catch (error) {
      console.log(error)
      console.log('It is possible that the Page already exists, you must enter another');
  }
  };


//LIST--------------------------------------------------------------------------------------------------------------


export const ListPages = async() => {

    try {
      

    const data = await axios({
      method: "get",
      url: "http://127.0.0.1:8000/pages/list/",
    });

  
    if (data.status === 200 ) {

      console.log(data.data)
    }

  } catch (error) {
      console.log(error)
      console.log('List query error');
  }

  

  };

//UPDATE--------------------------------------------------------------------------------------------------------------


export const EditPages = async(book,pageid,elementorder,type,template) => {

    try {
      

    const data = await axios({
      method: "put",
      url: "http://127.0.0.1:8000/pages/change/",
      data: {
        book: book,
        pageid: pageid,
        elementorder: elementorder,
        type: type,
        template: template
        
    },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('The Page was successfully updated');
    
    }

  } catch (error) {
      console.log(error)
      console.log('Error');
  }
  };

//--------------------------------------------------------------------------------------------------------------

export const TemplatePages = async() => {

  try {
    

  const data = await axios({
    method: "get",
    url: "http://127.0.0.1:8000/pages/template/",
  });

  if (data.status === 200 ) {

    console.log(data.data)
  }

} catch (error) {
    console.log(error)
    console.log('List query error');
}



};


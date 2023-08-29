import axios from "axios";

const moment = require("moment");

//CREATE--------------------------------------------------------------------------------------------------------------

export const InsertTags = async(description) => {

    try {
      

    const data = await axios({
      method: "post",
      url: "http://127.0.0.1:8000/Tags/tags/insertTags/",
      data: {
        description:description
    },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('The Tag was entered correctly');
    
    }

  } catch (error) {
      console.log(error)
      console.log('It is possible that the Tag already exists, you must enter another');
  }
  };


//List all--------------------------------------------------------------------------------------------------------------


export const ListTags = async() => {

    try {
      

    const data = await axios({
      method: "get",
      url: "http://127.0.0.1:8000/Tags/tags/listAllTags/",
    });

  
    if (data.status === 200 ) {


      console.log(data.data)
    }

  } catch (error) {
      console.log(error)
      console.log('List query error');
  }

  

  };



  //search--------------------------------------------------------------------------------------------------------------


export const SearchTags = async(search) => {

    try {
      

    const data = await axios({
      method: "post",
      url: "http://127.0.0.1:8000/Tags/tags/searchTags/",
      data: {
        tagsId: search
      }
    });

  
    if (data.status === 200 ) {

      console.log(data.data)
    }

  } catch (error) {
      console.log(error)
      console.log('This Tag does not exist');
  }

  

  };
//UPDATE--------------------------------------------------------------------------------------------------------------


export const EditTags = async(tagsId, description) => {

    try {
      

    const data = await axios({
      method: "put",
      url: "http://127.0.0.1:8000/Tags/tags/updateTags/",
      data: {
        tagsId:tagsId,
        description: description
    },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('The Tag was successfully updated');
    
    }

  } catch (error) {
      console.log(error)
      console.log('Error');
  }
  };


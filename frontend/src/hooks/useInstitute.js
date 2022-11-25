import axios from "axios";

const moment = require("moment");

//CREATE--------------------------------------------------------------------------------------------------------------

export const InsertInstitute = async(name) => {

    try {
      

    const data = await axios({
      method: "post",
      url: "http://127.0.0.1:8000/institute/Institute/CreateInstitute",
      data: {
        name: name
      },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('The Institute was entered correctly');
    
    }

  } catch (error) {
      console.log(error)
      console.log('It is possible that the Institute already exists, you must enter another');
  }
  };


//LIST--------------------------------------------------------------------------------------------------------------


export const ListInstitute = async() => {

    try {
      

    const data = await axios({
      method: "get",
      url: "http://127.0.0.1:8000/institute/Institute/listInstitute",
    });

  
    if (data.status === 200 ) {
    //   console.log('Institute list queried successfully');
      console.log(data.data)
    }

  } catch (error) {
      console.log(error)
      console.log('List query error');
  }

  

  };

//UPDATE--------------------------------------------------------------------------------------------------------------


export const EditInstitute = async(name, change) => {

    try {
      

    const data = await axios({
      method: "put",
      url: "http://127.0.0.1:8000/institute/Institute/UpdateInstitute",
      data: {
        name: change
      },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('The Institute was successfully updated');
    
    }

  } catch (error) {
      console.log(error)
      console.log('It is possible that the Insitute already exists, you must enter another');
  }
  };

  //DELETE--------------------------------------------------------------------------------------------------------------

export const DeleteInstitute = async() => {

  try {
    

  const data = await axios({
    method: "delete",
    url:"http://127.0.0.1:8000/institute/Institute/DeleteInstitute/1",
  });


  if (data.status === 200 ) {
    console.log("successfully removed")
  }

} catch (error) {
    console.log(error)
    console.log('This role does not exist');
}



};



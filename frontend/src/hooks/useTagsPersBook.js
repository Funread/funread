import axios from "axios";

const moment = require("moment");

//CREATE--------------------------------------------------------------------------------------------------------------

export const InsertTagsPersBook = async(name) => {

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


export const ListTagsPersBook = async() => {

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


export const EditTagsPersBook = async(name, change) => {

    try {
      

    const data = await axios({
      method: "put",
      url: "http://127.0.0.1:8000/institute/Institute/UpdateInstitute",
      data: {
        name : name,
        change : change

      },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('The Institute was successfully updated');
    
    }

  } catch (error) {
      console.log(error)
      console.log('Error');
  }
  };

  //DELETE--------------------------------------------------------------------------------------------------------------

export const DeleteTagsPersBook = async(instituteId) => {

  try {
    

  const data = await axios({
    method: "delete",
    url:"http://127.0.0.1:8000/institute/Institute/deleteInstitute",
    data: {
      instituteId: instituteId
    },
  });


  if (data.status === 200 ) {
    console.log("successfully removed")
  }

} catch (error) {
    console.log(error)
    console.log('This Institute does not exist');
}



};


import axios from "axios";

const moment = require("moment");

//CREATE--------------------------------------------------------------------------------------------------------------

export const InsertClasses = async(name, grade, teacherAssigned) => {

    try {
      

    const data = await axios({
      method: "post",
      url: "http://127.0.0.1:8000/classes/classes/createClasses",
      data: {
        name:name,
        grade:grade,
        teacherAssigned:teacherAssigned
    },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('The Class was entered correctly');
    
    }

  } catch (error) {
      console.log(error)
      console.log('It is possible that the Class already exists, you must enter another');
  }
  };


//LIST--------------------------------------------------------------------------------------------------------------


export const ListClasses = async() => {

    try {
      

    const data = await axios({
      method: "get",
      url: "http://127.0.0.1:8000/classes/classes/listedClasses",
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


export const EditClasses = async(classesId,name ,grade, teacherAssigned ) => {

    try {
      

    const data = await axios({
      method: "put",
      url: "http://127.0.0.1:8000/classes/classes/changeClasses",
      data: {
        classesId : classesId,
        name : name,
        grade:grade,
        teacherAssigned:teacherAssigned

      },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('The Class was successfully updated');
    
    }

  } catch (error) {
      console.log(error)
      console.log('Error');
  }
  };

  //DELETE--------------------------------------------------------------------------------------------------------------

export const DeleteClasses = async(classesId) => {

  try {
    

  const data = await axios({
    method: "delete",
    url:"http://127.0.0.1:8000/classes/classes/deleteClasses",
    data: {
        classesId : classesId
    },
  });


  if (data.status === 200 ) {
    console.log("successfully removed")
  }

} catch (error) {
    console.log(error)
    console.log('This Class does not exist');
}



};



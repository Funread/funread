import axios from "axios";

const moment = require("moment");

//CREATE--------------------------------------------------------------------------------------------------------------

export const InsertClassesLog = async(classesid, userid, createat, description) => {

    try {
      

    const data = await axios({
      method: "post",
      url: "http://127.0.0.1:8000/classeslog/classeslog/createclasseslog",
      data: {
        classesid:classesid,
        userid:userid,
        createat:createat,
        description:description
    },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('The ClassesLog was entered correctly');
    
    }

  } catch (error) {
      console.log(error)
      console.log('It is possible that the ClassesLog already exists, you must enter another');
  }
  };


//LIST--------------------------------------------------------------------------------------------------------------


export const ListClassesLog = async() => {

    try {
      

    const data = await axios({
      method: "get",
      url: "http://127.0.0.1:8000/classeslog/classeslog/listedclasseslog",
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


export const EditClassesLog = async(classeslogid,createat,description,classesid,userid) => {

    try {
      

    const data = await axios({
      method: "put",
      url: "http://127.0.0.1:8000/classeslog/classeslog/changeclasseslog",
      data:{
        classeslogid:classeslogid,
        createat:createat ,
        description:description,
        classesid:classesid,
        userid:userid
    },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('The ClassesLog was successfully updated');
    
    }

  } catch (error) {
      console.log(error)
      console.log('Error');
  }
  };

  //DELETE--------------------------------------------------------------------------------------------------------------

export const DeleteClassesLog = async(classeslogid) => {

  try {
    

  const data = await axios({
    method: "delete",
    url:"http://127.0.0.1:8000/classeslog/classeslog/deleteclasseslog",
    data: {
      classeslogid:classeslogid
    },
  });


  if (data.status === 200 ) {
    console.log("successfully removed")
  }

} catch (error) {
    console.log(error)
    console.log('This ClassesLog does not exist');
}
};



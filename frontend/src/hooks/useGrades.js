import axios from "axios";

const moment = require("moment");

//CREATE--------------------------------------------------------------------------------------------------------------

export const InsertGrades = async (booksid,progress,grade,iduser) => {
    try {
    const data = await axios({
      method: "post",
      url: "http://127.0.0.1:8000/grades/grades/creategrade",
      data: {
        booksid:booksid,
        progress:progress,
        grade:grade,
        iduser:iduser
    },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('The Grade was entered correctly');
    
    }

  } catch (error) {
      console.log(error)
      console.log('It is possible that the Grade already exists, you must enter another');
  }
  };


//LIST--------------------------------------------------------------------------------------------------------------


export const ListGrades = async() => {

    try {
      

    const data = await axios({
      method: "get",
      url: "http://127.0.0.1:8000/grades/grades/listgrade",
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


export const EditGrades = async(gradesid,booksid,progress,grade,iduser) => {

    try {
      

    const data = await axios({
      method: "put",
      url: "http://127.0.0.1:8000/grades/grades/gradechange/",
      data:  {
        gradesid:gradesid,
        booksid:booksid ,
        progress:progress ,
        grade:grade ,
        iduser:iduser
},
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('The Grade was successfully updated');
    
    }

  } catch (error) {
      console.log(error)
      console.log('Error');
  }
  };

  //DELETE--------------------------------------------------------------------------------------------------------------

export const DeleteGrades = async(gradesid) => {

  try {
    

  const data = await axios({
    method: "delete",
    url:"http://127.0.0.1:8000/grades/grades/deletegrade",
    data: {
      gradesid: gradesid
  },
});


  if (data.status === 200 ) {
    console.log("Successfully removed")
  }

} catch (error) {
    console.log(error)
    console.log('This Grade does not exist');
}
};



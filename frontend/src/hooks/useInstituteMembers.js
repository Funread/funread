import axios from "axios";

const moment = require("moment");

//CREATE--------------------------------------------------------------------------------------------------------------

export const InsertInstituteMembers = async(instituteId, userId) => {

    try {
      

    const data = await axios({
      method: "post",
      url: "http://127.0.0.1:8000/institute/InstituteMembers/CreateMembers",
      data: {
        instituteId : instituteId,
        userId : userId
      },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('The InstituteMember was entered correctly');
    
    }

  } catch (error) {
      console.log(error)
      console.log('It is possible that the InstituteMember already exists, you must enter another');
  }
  };


//LIST--------------------------------------------------------------------------------------------------------------


export const ListInstituteMembers = async() => {

    try {
      

    const data = await axios({
      method: "get",
      url: "http://127.0.0.1:8000/institute/InstituteMembers/ListedMembers",
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


export const EditInstituteMembers = async(instituteMembersId,userchange,institutechange) => {

    try {
      

    const data = await axios({
      method: "put",
      url: "http://127.0.0.1:8000/institute/InstituteMembers/ChangeMembers",
      data: {
        instituteMembersId : instituteMembersId,
        userchange : userchange,
        institutechange : institutechange

      },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('The InstituteMember was successfully updated');
    
    }

  } catch (error) {
      console.log(error)
      console.log('It is possible that the InsituteMember already exists, you must enter another');
  }
  };

  //DELETE--------------------------------------------------------------------------------------------------------------

export const DeleteInstituteMembers = async(instituteMembersId) => {

  try {
    

  const data = await axios({
    method: "delete",
    url:"http://127.0.0.1:8000/institute/InstituteMembers/DeleteMembers",
    data: {
      instituteMembersId: instituteMembersId
    },
  });


  if (data.status === 200 ) {
    console.log("successfully removed")
  }

} catch (error) {
    console.log(error)
    console.log('This InstituteMember does not exist');
}



};


